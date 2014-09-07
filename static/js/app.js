jQuery(window).load(function() { 
	jQuery(".loading").delay(1000).fadeOut("slow"); 
	jQuery(".preloadermask").delay(1500).fadeOut("slow");
});

jQuery(document).ready(function() {
	// PHP vars
	// home_url
	// template_directory_uri
	// retina_logo_url
	// menu_style
	// is_front_page
	
	// retina logo or regular?
	if (window.devicePixelRatio > 1 && typeof retina_logo_url != "undefined" ) {
		jQuery(".logo").attr("src", retina_logo_url);
	}
	
	// floating menu or static?
	if( menu_style == 1) {
		jQuery(window).bind('scroll', function() {
				if (jQuery(window).scrollTop() > jQuery(window).height()) {
					jQuery('.bkaTopmenu').slideDown(200);
					jQuery(".bkaTopmenu").removeClass('hidden').addClass('displayed');
				}
				if (jQuery(window).scrollTop() < jQuery(window).height()) {
					jQuery('.bkaTopmenu').slideUp(200, function() {
						jQuery(".bkaTopmenu").removeClass('displayed').addClass('hidden');
					});
				}
			});
	}
	if(is_front_page) {
	jQuery("#mainNavUl li a, li.page_item a").live("click",function(){
			var currentItem = jQuery(this).attr('href');
			currentItem = currentItem.split('/').reverse()[1];
			var target = '#' + currentItem;
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				jQuery("#mainNavUl").parent().collapse('toggle');
			}
			jQuery('html, body').animate({
				scrollTop: jQuery(target).offset().top-60
			}, 1000);
			return false;
		});
	} else {
		jQuery("#mainNavUl li a, .blog_widget .page_item_has_children .children li.page_item a").live("click",function(){
			var currentItem = jQuery(this).attr('href');
			currentItem = currentItem.split('/').reverse()[1];
			if(currentItem != 'blog') {
			var target =  home_url + '#' + currentItem;
			window.location = target;
			return false;
			}
		});
	}
	
	var windowWidth = jQuery(window).width(); //retrieve current window width
	var windowHeight = jQuery(window).height(); //retrieve current window height
	
	jQuery('.hgrHeaderImage img').width(windowWidth).height(windowHeight);
	jQuery('.blogPosts').css("min-height",windowHeight);
	
	jQuery("#pagesContent").css("margin-top", windowHeight);
		
	jQuery(window).resize(function() {
		windowWidth = jQuery(window).width(); //retrieve current window width
		windowHeight = jQuery(window).height(); //retrieve current window height
		jQuery('.hgrHeaderImage img').width(windowWidth).height(windowHeight);
		jQuery('.blogPosts').css("min-height",windowHeight);
	});
	
	jQuery(".preloadermask").remove();
	
	jQuery(".readTheBlogBtn").click(function() {
		jQuery('html, body').animate({
			scrollTop: jQuery("#blogPosts").offset().top
		}, 1000);
	});
	
	jQuery('.parallax').each(function(){
		//jQuery(this).width(jQuery(this).parent().width());
		//jQuery(this).height(jQuery(this).parent().height());
	});
	
	if (jQuery("#grid3d").length > 0){
		new grid3D( document.getElementById( 'grid3d' ));
	}

	
	// Back to top button
		jQuery(window).bind("scroll", function() {
			if (jQuery(window).scrollTop() > jQuery(window).height()) { 
				jQuery('.back-to-top').fadeIn(500);
			}
			if (jQuery(window).scrollTop() < jQuery(window).height()) {
				jQuery('.back-to-top').fadeOut(500);
			}
		});
		jQuery('.back-to-top').click(function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, 1000);
			return false;
    	});
	
	// Portfolio Isotope
	var container = jQuery('#portfolio-items');
	container.isotope({
		animationEngine : 'best-available',
		filter:"*",
	  	animationOptions: {
	     	duration: 200,
	     	queue: false
	   	},
		layoutMode: 'fitRows'
	});	
	jQuery('#filters a').click(function(){
		jQuery('#filters li').removeClass('active');
		jQuery(this).parent().addClass('active');
		var selector = jQuery(this).attr('data-filter');
	  	container.isotope({ filter: selector });
        setProjects();		
	  	return false;
	});
	function splitColumns() {
		var winWidth = jQuery(window).width(), 
			columnNumb = 1;			
		if (winWidth > 1024) {
			columnNumb = 4;
		} else if (winWidth > 900) {
			columnNumb = 3;
		} else if (winWidth > 479) {
			columnNumb = 2;
		} else if (winWidth < 479) {
			columnNumb = 1;
		}
		return columnNumb;
	}
	function setColumns() { 
	var container = jQuery('#portfolio-items');
		var winWidth = jQuery(window).width(), 
			columnNumb = splitColumns(), 
			postWidth = Math.floor(winWidth / columnNumb);
		
		container.find('.portfolio-item').each(function () { 
			jQuery(this).css( { 
				width : postWidth + 'px' 
			});
		});
	}
	function setProjects() { 
		setColumns();
		container.isotope('reLayout');
	}
	container.imagesLoaded(function () { 
		setProjects();	
	});
	jQuery(window).bind('resize', function () { 
		setProjects();			
	});
	setProjects();	
});