jQuery(document).ready(function() {		
// Blog posts Isotope
var container = jQuery(".hgr_blog_posts");
container.isotope({
	animationEngine : "best-available",
	filter:"*",
	animationOptions: {
		duration: 200,
		queue: false
	},
	layoutMode: "masonry"
});	
function splitColumns() {
	var winWidth = jQuery(window).width(), 
		columnNumb = 3;			
	if (winWidth > 1024) {
		columnNumb = 3;
	} else if (winWidth > 900) {
		columnNumb = 2;
	} else if (winWidth > 479) {
		columnNumb = 2;
	} else if (winWidth < 479) {
		columnNumb = 1;
	}
	return columnNumb;
}
function setColumns() { 
var container = jQuery(".hgr_blog_posts");
	var winWidth = jQuery(container).width(), 
		columnNumb = splitColumns(), 
		postWidth = Math.floor(winWidth / columnNumb)-20;
		//console.log(postWidth);
	container.find(".hgr_blog_post").each(function () { 
		jQuery(this).css( { 
			width : postWidth + "px" 
		});
	});
}
function setProjects() { 
	setColumns();
	container.isotope("reLayout");
}
container.imagesLoaded(function () { 
	setProjects();	
});
jQuery(window).bind("resize", function () { 
	setProjects();			
});
setProjects();	
jQuery(".hgr_post_meta").tooltip();
jQuery(".hgr_post_meta i").hover(function() {
	jQuery(this).toggleClass( "fa-lg" );
});
});