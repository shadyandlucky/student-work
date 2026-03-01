// JavaScript Document
 /* .listScroller
 * Version: 1.0
 * http://vietconn.com/listScroller/
 *
 * Copyright (c) 2012 Hieu Pham - http://www.vietconn.com - http://www.hieu.co.uk
 * COMMON DEVELOPMENT AND DISTRIBUTION LICENSE (CDDL)
 * http://www.opensource.org/licenses/cddl1.php
 *
 * Date: 07/03/2012
 */
 listScrollerEffectCount = 0;
 
(function ($) {
    $.fn.listScroller = function (Arguements, Callback) {

        var Args = $.extend(listScrollerDefaults, Arguements);
        var Obj = this; // Just a way to reference to current obj in case we need to pass in another event handle  
        var FirstObj = Obj.eq(1);
        var WideList;
        var Viewport;

		var movePrev = function() {
            var cLeft = WideList.position().left;
            if (!WideList.hasClass("animated")) {
                WideList.addClass("animated");
                WideList.animate({
                    left: cLeft - Args.itemWidth
                }, 
				Args.speed,
				function () {
                    WideList.append(WideList.children().first().remove());
                    WideList.css("left", 0);
                    WideList.removeClass("animated");
                });
            };		
		}
		
		var moveNext = function() {
            var cLeft = WideList.position().left;
            if (!WideList.hasClass("animated")) {
                WideList.css("left", -Args.itemWidth);
                WideList.prepend(WideList.children().last().remove());

                WideList.addClass("animated");
                WideList.animate({
                    left: 0
                },
				Args.speed, 
				function () {
                    WideList.removeClass("animated");
                });
            };		
		}		
		
        if (Args.itemWidth == null) {
            Args.itemWidth = Obj.outerWidth()
				+ parseInt(Obj.css("margin-left").replace('px', ''))
				+ parseInt(Obj.css("margin-right").replace('px', ''));
            Args.itemHeight = Obj.outerHeight() + 5;
            Args.containerWidth = Args.itemWidth * Obj.length;
        }
		
		listScrollerEffectCount++;
		
        Obj.wrapAll("<div id='wideListScroller" + listScrollerEffectCount + "' style='display: block; overflow: hidden; width:" + Args.containerWidth + "px; height:" + Args.itemHeight + "px '></div>")
        WideList = $("#wideListScroller" + listScrollerEffectCount);
        WideList.css("position", "relative");

        WideList.wrap("<div id='viewportListScroller" + listScrollerEffectCount + "' style='display:block; overflow: hidden; position: relative;'>");
        Viewport = WideList.parent();
        if (Args.width != null) { Viewport.css("width", Args.width + "px"); }
        if (Args.height != null) { Viewport.css("width", Args.height + "px"); }
		if (Args.interval > 0) {
			setInterval(moveNext, Args.interval);
		}
		
		
		
        Args.prevItem.click(function (e) {
            e.preventDefault();
			movePrev();
        });

        Args.nextItem.click(function (e) {
            e.preventDefault();
			moveNext();
        });

    };
})(jQuery); 

//Default value should be set here  
var listScrollerDefaults = {
	itemWidth: null,
	prevItem: null,
	nextItem: null,
	width: null,
	height: null,
	speed: 4000,
	interval: 0
};