jQuery(window).load(function() {
	jQuery('body').append(
	"<div class='switcher'>"+
		"<div class='switcherWrappper'>"+

			"<button class='switcherShowHide'><i class='fa fa-cog fa-spin'></i></button>"+
			"<div class='switcherContents'>"+
				"<header><h5>√Œ — ·Ê‰ «·’›Õ…</h5></header>"+
				"<!--  Skins Colors -->"+
				"<div class='switcherContent skinsColor'>"+    
					"<ul class='demo-content demo-color'>"+
					
						"<li data-name='gnrl_color' data-value='blue' data-value-2='3498db' style='background-color: #3498db;'></li>"+
						
						"<li data-name='gnrl_color' data-value='pink' data-value-2='ff6b6b' style='background-color: #ff6b6b;'></li>"+
						
						"<li data-name='gnrl_color' data-value='green' data-value-2='16a085' style='background-color: #16a085;'></li>"+
						
						"<li data-name='gnrl_color' data-value='red' data-value-2='cd2f2e' style='background-color: #cd2f2e;'></li>"+
						
						"<li data-name='gnrl_color' data-value='purple' data-value-2='904eab' style='background-color: #904eab;'></li>"+

						"<li data-name='gnrl_color' data-value='brown' data-value-2='a57b4a' style='background-color: #a57b4a;'></li>"+

						"<li data-name='gnrl_color' data-value='cyan' data-value-2='2997ab' style='background-color: #2997ab;'></li>"+

						"<li data-name='gnrl_color' data-value='lightgreen' data-value-2='38cbcb' style='background-color: #38cbcb;'></li>"+

						"<li data-name='gnrl_color' data-value='yellow' data-value-2='f8ba01' style='background-color: #f8ba01;'></li>"+

					"</ul>"+
				"</div>"+
				"<!--  End Skins Colors -->"+

			"</div>"+
		"</div>"+
	"</div>");
	


	//-- show and hide switcher --

	jQuery('.switcherShowHide').click(function() {
		if ( jQuery('.switcherShowHide').hasClass('switcherToggle') )
			{
			jQuery('.switcherShowHide').removeClass('switcherToggle');
			jQuery('.switcher').removeClass('opened');
		}else
		{   
			jQuery('.switcherShowHide').addClass('switcherToggle');
			jQuery('.switcher').addClass('opened');
		}

	});


   //-- controlling the position of switcher --
	var jQueryswitcherWrappper = jQuery('.switcherWrappper');

	jQueryswitcherWrappper.resize(function(){

		jQuery('.switcher').css({ 'left' : - jQueryswitcherWrappper.width()});

	});

	jQueryswitcherWrappper.trigger('resize');



	var emerald_gnrl_color=false;
	
	
	
	// Color
	jQuery('li[data-name=gnrl_color]').click(function() {
		emerald_gnrl_color = jQuery(this).attr("data-value");
		emerald_gnrl_color_2 = jQuery(this).attr("data-value-2");
		if(emerald_gnrl_color!=false){
			pointer_color(emerald_gnrl_color,emerald_gnrl_color_2);
		}
	});
	
	// General Color
	function pointer_color(color_style,color_style_2){
		if (color_style != "skins") {	
		}
		jQuery('head').append('<link rel="stylesheet" href="assets/css/skins/'+color_style+'.css">');
	}
	
});