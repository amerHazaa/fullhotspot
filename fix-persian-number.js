(() => {
  'use strict';

  const
  // Establish the root object, `window` (`self`) in the browser, `global`
  // on the server, or `this` in some virtual machines. We use `self`
  // instead of `window` for `WebWorker` support.
  root = (() => {
    if (typeof self == 'object' && self.self === self) return self;
    else if (typeof global == 'object' && global.global === global) return global;
    else return this;
  })(),

  persianNumberArr = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
  arabicNumberArr  = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g],
  fixPersianNumber = str => {
    if(typeof str === 'string')
    {
      let i = 0;
      for(; i<10; i++)
      {
        str = str.replace(persianNumberArr[i], i).replace(arabicNumberArr[i], i);
      }
    }
    return str;
  };

  root.fixPersianNumber = fixPersianNumber;
})();
