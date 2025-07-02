// assets/js/main.js

document.addEventListener("DOMContentLoaded", function () {
    // كود التوجيه لـ Chrome Captive Portal (الجزء الأول من السكريبت الأصلي)
    const ua = navigator.userAgent.toLowerCase();
    const isAndroid = ua.includes("android");
    const isCNA = ua.includes("captive") && isAndroid;
    const isWebView = ua.includes("wv") || ua.includes("captive");
    const isInChrome = ua.includes("chrome") && !isWebView;
    const currentHost = window.location.hostname;

    if (isCNA && !isInChrome && currentHost) {
        const chromeURL = `intent://${currentHost}/login#Intent;scheme=http;package=com.android.chrome;end`;
        window.location.href = chromeURL;

        setTimeout(() => {
            const manualLink = document.getElementById("manual-open");
            if (manualLink) {
                manualLink.style.display = "block";
                manualLink.href = `http://${currentHost}/login`;
            }
            const toast = document.getElementById("toast-message");
            if (toast) toast.style.display = "block";
        }, 3000);
    }

    // كود قراءة المعلمات من location.hash والتركيز بعد الخطأ (الجزء الثاني من السكريبت الأصلي)
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const userFromHash = params.get('username'); // تم تغيير الاسم لتجنب التعارض
    const autologin = params.get('autologin');

    // كود إزالة المسافات وتغيير placeholder (الجزء الثالث من السكريبت الأصلي)
    function removeSpaces(string) {
        return string.split(' ').join('');
    }
    // تطبيق وظيفة removeSpaces على حقل اسم المستخدم عند تغيير القيمة
    const usernameInput = document.getElementById("username");
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            this.value = removeSpaces(this.value);
        });
        // تطبيق نفس المنطق لـ placeholder باستخدام jQuery كما كان في الكود الأصلي
        $(usernameInput).focus(function(){
            $(this).attr('data-text', $(this).attr('placeholder'));
            $(this).attr('placeholder', '');
        }).blur(function(){
            $(this).attr('placeholder', $(this).attr('data-text'));
        });
    }

    // --- بداية منطق "تذكرني" وإدارة الكوكيز ---

    // 1. استعادة اسم المستخدم من الكوكيز عند تحميل الصفحة
    const savedUsername = hotCookie.get('remember_username');
    if (savedUsername && usernameInput && !userFromHash) { // لا نملأه إذا كان هناك اسم مستخدم في الهاش URL
        usernameInput.value = savedUsername;
    }

    // 2. معالجة زر تسجيل الدخول
    // سنقوم بتغيير طريقة معالجة النقر على زر تسجيل الدخول لدمج وظيفة "تذكرني".
    // بما أن زر الإرسال لديه `onclick="return rem();"`، سنقوم بإزالة هذا الاستدعاء أولاً
    // (كما اتفقنا في خطتنا الأصلية) ثم نربط الدالة بمعالج حدث `submit` للنموذج.

    const loginForm = document.forms['login'];
    const rememberMeCheckbox = document.getElementById('remember');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            // منع الإرسال الافتراضي للنموذج مؤقتًا إذا كنا نستخدم CHAP
            // سيتم إرساله بواسطة doLogin() إذا كان chap-id موجودًا
            if ($(chap-id)) { // تحقق من وجود chap-id كما هو في Mikrotik HTML
                 // إذا كانت doLogin موجودة وستُستخدم، لا نمنع الإرسال هنا
                 // doLogin() ستُنفذ بواسطة onSubmit="return doLogin()"
            } else {
                event.preventDefault(); // نمنع الإرسال الافتراضي إذا لم يكن CHAP
            }

            // إذا كان المستخدم قد حدد "تذكرني"
            if (rememberMeCheckbox && rememberMeCheckbox.checked) {
                hotCookie.set('remember_username', usernameInput.value, { expires: 365 }); // احفظ لـ 365 يومًا
            } else {
                hotCookie.remove('remember_username'); // إذا لم يتم تحديدها، احذف الكوكي
            }

            // هنا، إذا لم نكن نستخدم CHAP، سنقوم بإرسال النموذج يدوياً
            // ولكن بما أن form لديها onSubmit="return doLogin()" في حالة CHAP
            // ودون CHAP يتم إرسالها بشكل طبيعي، فليس هناك حاجة للإرسال اليدوي هنا.
            // المهم هو أن منطق الكوكي يتم تنفيذه قبل إرسال النموذج.
        });
    }

    // 3. التركيز بعد إغلاق رسالة الخطأ (من السكريبت الأصلي)
    const alertErrorElement = document.getElementById("alert-error");
    if (alertErrorElement) {
        setTimeout(function () {
            alertErrorElement.style.display = "none";
            if (usernameInput) {
                usernameInput.focus();
                const evt = new Event('touchstart');
                usernameInput.dispatchEvent(evt);
            }
        }, 3000);
    } else {
        // إذا ما فيش خطأ، ركز مباشرة
        if (usernameInput) {
            usernameInput.focus();
        }
    }
});