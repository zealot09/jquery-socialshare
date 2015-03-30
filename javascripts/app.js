require.config({
    paths: {
    	"jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min",
    	"underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.2/underscore",
    	"util": 'util'
    }
});

require(["jquery", "./socialshare"], function ($, socialshare) {
	$(document).ready(function() {
		socialshare.initialize('#container');
	});
});