/***************************************************************************************************
LoadingOverlay - A flexible loading overlay jQuery plugin
    Author          : Gaspare Sganga
    Version         : 2.1.7
    License         : MIT
    Documentation   : https://gasparesganga.com/labs/jquery-loading-overlay/
***************************************************************************************************/
; (function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module
        define(["jquery"], factory);
    } else if (typeof module === "object" && module.exports) {
        // Node/CommonJS
        factory(require("jquery"));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($, undefined) {
    "use strict";

    // Default Settings
    var _defaults = {
        // Background
        background: "rgba(255, 255, 255, 0.3)",
        backgroundClass: "",
        // Image
        image: `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
	<path style="fill:#3949AB;" d="M303.516,13.164l-21.838,82.662c-16.729-2.619-33.773-2.619-50.501,0l-22.18-82.662
		c31.324-6.142,63.536-6.142,94.861,0L303.516,13.164z"/>
	<path style="fill:#3949AB;" d="M197.906,104.697c-15.833,6.142-30.574,14.784-43.677,25.592L94.003,69.381
		c24.005-21.002,51.883-37.117,82.065-47.43L197.906,104.697z"/>
	<path style="fill:#3949AB;" d="M130.088,153.663c-10.808,13.103-19.45,27.844-25.592,43.677l-82.747-22.18
		c10.314-30.181,26.428-58.059,47.43-82.065L130.088,153.663z"/>
</g>
<path style="fill:#A8A5A4;" d="M94.003,256.031c-0.017,8.565,0.64,17.13,1.962,25.592l-82.662,22.18
	c-6.142-31.324-6.142-63.536,0-94.861l82.662,21.497C94.643,238.901,93.986,247.457,94.003,256.031z"/>
<g>
	<path style="fill:#BDBDBD;" d="M130.088,357.801L69.52,418.113c-21.002-24.005-37.117-51.883-47.43-82.065l82.747-22.18
		C110.851,329.77,119.382,344.596,130.088,357.801z"/>
	<path style="fill:#BDBDBD;" d="M197.906,407.194l-22.18,82.747c-30.062-10.356-57.821-26.471-81.723-47.43l60.567-60.567
		C167.589,392.598,182.219,401.12,197.906,407.194z"/>
	<path style="fill:#BDBDBD;" d="M303.516,498.727c-31.324,6.142-63.536,6.142-94.861,0l21.838-82.662
		c16.729,2.619,33.773,2.619,50.501,0L303.516,498.727z"/>
</g>
<path style="fill:#F4F4F4;" d="M418.167,442.51c-24.005,21.002-51.883,37.117-82.065,47.43l-22.18-82.747
	c15.833-6.142,30.574-14.784,43.677-25.592L418.167,442.51z"/>
<g>
	<path style="fill:#283593;" d="M490.081,336.304c-10.348,30.088-26.454,57.88-47.43,81.809l-60.567-60.567
		c10.808-13.103,19.45-27.844,25.592-43.677L490.081,336.304z"/>
	<path style="fill:#283593;" d="M503.474,256.031c0.034,15.927-1.51,31.811-4.607,47.43l-82.662-22.18
		c2.619-16.729,2.619-33.773,0-50.501l82.662-22.18C501.964,224.22,503.508,240.104,503.474,256.031z"/>
</g>
<g>
	<path style="fill:#3949AB;" d="M490.081,175.587l-82.747,22.18c-6.142-15.833-14.784-30.574-25.592-43.677l60.567-60.567
		C463.431,117.502,479.665,145.38,490.081,175.587z"/>
	<path style="fill:#3949AB;" d="M418.167,69.381L357.6,129.948c-13.103-10.808-27.844-19.45-43.677-25.592l22.18-82.747
		C366.31,32.025,394.188,48.259,418.167,69.381z"/>
</g>
<path d="M281.677,104.356h-1.28c-15.858-2.465-31.998-2.465-47.857,0c-4.308,0.674-8.428-2.013-9.554-6.227l-22.18-82.662
	c-1.314-4.521,1.288-9.256,5.809-10.569c0.111-0.034,0.222-0.06,0.333-0.094c32.425-6.338,65.763-6.338,98.188,0
	c4.624,0.921,7.618,5.417,6.697,10.032c-0.034,0.179-0.077,0.367-0.128,0.546l-22.18,82.662
	C288.561,101.635,285.388,104.186,281.677,104.356z M256.085,85.418c6.33-0.009,12.651,0.333,18.938,1.024l17.829-66.454
	c-24.363-3.779-49.171-3.779-73.534,0l17.829,66.454C243.434,85.751,249.764,85.41,256.085,85.418z"/>
<path d="M154.23,138.479c-2.269,0.017-4.444-0.879-6.057-2.474L87.605,75.437c-3.438-3.216-3.617-8.616-0.401-12.054
	c0.128-0.136,0.264-0.273,0.401-0.401c24.944-21.787,53.931-38.456,85.306-49.051c4.462-1.527,9.307,0.853,10.834,5.315
	c0.068,0.188,0.119,0.384,0.171,0.572l22.18,82.747c1.118,4.214-1.126,8.599-5.204,10.151
	c-14.946,5.724-28.876,13.785-41.288,23.886C158.085,137.822,156.183,138.487,154.23,138.479z M106.287,70.234l48.71,48.71
	c10.177-7.652,21.199-14.127,32.843-19.279l-17.914-66.539c-23.007,8.838-44.487,21.25-63.639,36.767
	C106.287,69.892,106.287,70.234,106.287,70.234z"/>
<path d="M104.837,206.297c-0.734,0.094-1.484,0.094-2.218,0l-82.747-22.18c-4.555-1.211-7.268-5.878-6.057-10.433
	c0.051-0.196,0.111-0.384,0.171-0.572c10.595-31.376,27.264-60.363,49.051-85.306c1.663-1.612,3.916-2.474,6.227-2.389
	c2.354-0.085,4.641,0.81,6.313,2.474l60.567,60.567c2.832,3.054,3.054,7.703,0.512,11.005
	c-10.109,12.429-18.179,26.402-23.886,41.374C111.508,204.113,108.36,206.289,104.837,206.297z M33.265,169.786l66.539,18
	c5.059-11.602,11.414-22.589,18.938-32.758l-48.71-48.881C54.515,125.299,42.111,146.779,33.265,169.786z"/>
<path d="M13.304,311.906c-4.12,0.085-7.712-2.79-8.531-6.824c-6.364-32.416-6.364-65.771,0-98.188
	c0.921-4.624,5.417-7.618,10.032-6.697c0.179,0.034,0.367,0.077,0.546,0.128l82.662,22.18c4.214,1.126,6.901,5.246,6.227,9.554
	c-2.491,15.858-2.491,31.998,0,47.857c0.674,4.308-2.013,8.428-6.227,9.554l-82.491,22.18
	C14.796,311.83,14.054,311.915,13.304,311.906z M20.043,219.178c-3.788,24.363-3.788,49.171,0,73.534l66.454-17.829
	c-1.399-12.583-1.399-25.293,0-37.876L20.043,219.178z"/>
<path d="M69.52,426.643L69.52,426.643c-2.363-0.077-4.581-1.126-6.142-2.9c-21.787-24.944-38.456-53.931-49.051-85.306
	c-1.527-4.462,0.853-9.307,5.315-10.834c0.188-0.068,0.384-0.119,0.572-0.171l82.747-22.18c4.214-1.117,8.599,1.126,10.151,5.204
	c5.545,15.159,13.495,29.337,23.545,41.971c2.764,3.395,2.508,8.343-0.597,11.431l-60.567,60.567
	C73.862,425.91,71.721,426.703,69.52,426.643z M33.265,342.105c8.846,23.007,21.25,44.487,36.767,63.638l48.71-48.71
	c-7.533-10.169-13.879-21.156-18.938-32.758L33.265,342.105z"/>
<path d="M175.727,498.471c-0.93,0.009-1.851-0.136-2.73-0.427c-31.376-10.595-60.363-27.264-85.306-49.051
	c-3.438-3.216-3.617-8.616-0.401-12.054c0.128-0.136,0.264-0.273,0.401-0.401l60.567-60.567c3.105-3.028,7.985-3.25,11.346-0.512
	c12.404,10.109,26.343,18.17,41.288,23.886c4.146,1.527,6.449,5.971,5.289,10.237l-22.18,82.747
	c-0.631,2.278-2.175,4.189-4.265,5.289C178.491,498.224,177.117,498.514,175.727,498.471z M106.287,441.999
	c19.151,15.517,40.631,27.921,63.639,36.767l17.914-66.539c-11.602-5.059-22.589-11.405-32.758-18.938L106.287,441.999z"/>
<path d="M256.085,511.95c-16.498,0.026-32.954-1.578-49.136-4.777c-4.624-0.921-7.618-5.417-6.697-10.032
	c0.034-0.179,0.077-0.367,0.128-0.546l22.18-82.662c1.126-4.214,5.246-6.901,9.554-6.227c15.858,2.482,31.998,2.482,47.857,0
	c4.308-0.674,8.428,2.013,9.554,6.227l22.18,82.662c1.22,4.547-1.476,9.23-6.023,10.45c-0.179,0.051-0.358,0.094-0.546,0.128
	C288.988,510.363,272.558,511.967,256.085,511.95z M219.318,492.073c24.363,3.762,49.171,3.762,73.534,0l-17.829-66.454
	c-12.583,1.399-25.293,1.399-37.876,0L219.318,492.073z"/>
<path d="M336.444,498.471c-1.399-0.009-2.781-0.358-4.009-1.024c-2.09-1.1-3.634-3.011-4.265-5.289l-22.18-82.577
	c-1.118-4.214,1.126-8.599,5.204-10.151c14.98-5.733,28.953-13.828,41.374-23.971c3.395-2.764,8.343-2.508,11.431,0.597
	l60.567,60.567c3.438,3.216,3.617,8.616,0.401,12.054c-0.128,0.136-0.264,0.273-0.401,0.401
	c-24.944,21.787-53.931,38.456-85.306,49.051C338.346,498.395,337.399,498.514,336.444,498.471z M324.33,412.227l17.829,66.539
	c23.007-8.846,44.487-21.25,63.639-36.767l-48.71-48.71C346.919,400.821,335.932,407.168,324.33,412.227z"/>
<path d="M442.65,426.643c-2.269,0.017-4.444-0.879-6.057-2.474l-60.567-60.567c-2.926-3.08-3.148-7.84-0.512-11.175
	c10.109-12.429,18.179-26.402,23.886-41.374c1.561-4.112,5.997-6.372,10.237-5.204l82.747,22.18
	c4.555,1.211,7.268,5.878,6.057,10.433c-0.051,0.196-0.111,0.384-0.171,0.572c-10.595,31.376-27.264,60.363-49.051,85.306
	c-1.561,1.774-3.779,2.824-6.142,2.9L442.65,426.643z M393.428,357.119l48.71,48.71c15.517-19.151,27.921-40.631,36.767-63.639
	l-66.539-17.914C407.316,335.903,400.961,346.925,393.428,357.119z"/>
<path d="M498.867,311.906c-0.734,0.094-1.484,0.094-2.218,0l-82.662-22.18c-4.214-1.126-6.901-5.246-6.227-9.554
	c2.491-15.858,2.491-31.998,0-47.857c-0.674-4.308,2.013-8.428,6.227-9.554l82.662-22.18c4.547-1.22,9.23,1.476,10.45,6.023
	c0.051,0.179,0.094,0.358,0.128,0.546c6.364,32.416,6.364,65.771,0,98.188c-0.819,4.035-4.41,6.91-8.531,6.825L498.867,311.906z
	 M425.674,274.883l66.454,17.829c3.788-24.363,3.788-49.171,0-73.534l-66.454,17.829
	C427.073,249.59,427.073,262.292,425.674,274.883z"/>
<path d="M407.333,206.297c-3.515-0.009-6.671-2.175-7.933-5.46c-5.707-14.971-13.777-28.944-23.886-41.374
	c-2.764-3.395-2.508-8.343,0.597-11.431l60.567-60.567c1.723-1.484,3.958-2.218,6.227-2.047c2.363,0.077,4.581,1.126,6.142,2.9
	c21.787,24.944,38.456,53.931,49.051,85.306c1.527,4.462-0.853,9.307-5.315,10.834c-0.188,0.068-0.384,0.119-0.572,0.171
	l-82.577,21.412C408.886,206.229,408.11,206.314,407.333,206.297z M393.428,155.113c7.524,10.143,13.871,21.105,18.938,32.672
	l66.454-17.829c-8.846-23.007-21.25-44.487-36.767-63.639L393.428,155.113z"/>
<path d="M357.941,138.479c-1.953,0.009-3.847-0.657-5.374-1.877c-12.438-10.109-26.402-18.17-41.374-23.886
	c-4.112-1.561-6.372-5.997-5.204-10.237l22.18-82.747c1.211-4.555,5.878-7.268,10.433-6.057c0.196,0.051,0.384,0.111,0.572,0.171
	c31.376,10.595,60.363,27.264,85.306,49.051c3.438,3.216,3.617,8.616,0.401,12.054c-0.128,0.136-0.264,0.273-0.401,0.401
	l-60.567,60.567C362.343,137.523,360.193,138.445,357.941,138.479z M324.33,99.664c11.602,5.059,22.589,11.405,32.758,18.938
	l48.71-48.71c-19.126-15.509-40.572-27.921-63.553-36.767L324.33,99.664z"/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
`,
        imageAnimation: "2000ms rotate_right",
        imageAutoResize: true,
        imageResizeFactor: 1,
        imageColor: "#202020",
        imageClass: "",
        imageOrder: 1,
        // Font Awesome
        fontawesome: "",
        fontawesomeAnimation: "",
        fontawesomeAutoResize: true,
        fontawesomeResizeFactor: 1,
        fontawesomeColor: "#202020",
        fontawesomeOrder: 2,
        // Custom
        custom: "",
        customAnimation: "",
        customAutoResize: true,
        customResizeFactor: 1,
        customOrder: 3,
        // Text
        text: "",
        textAnimation: "",
        textAutoResize: true,
        textResizeFactor: 0.5,
        textColor: "#202020",
        textClass: "",
        textOrder: 4,
        // Progress
        progress: false,
        progressAutoResize: true,
        progressResizeFactor: 0.25,
        progressColor: "#a0a0a0",
        progressClass: "",
        progressOrder: 5,
        progressFixedPosition: "",
        progressSpeed: 200,
        progressMin: 0,
        progressMax: 100,
        // Sizing
        size: 50,
        maxSize: 120,
        minSize: 20,
        // Misc
        direction: "column",
        fade: true,
        resizeInterval: 50,
        zIndex: 2147483647
    };

    // Required CSS
    var _css = {
        overlay: {
            "box-sizing": "border-box",
            "position": "relative",
            "display": "flex",
            "flex-wrap": "nowrap",
            "align-items": "center",
            "justify-content": "space-around"
        },
        element: {
            "box-sizing": "border-box",
            "overflow": "visible",
            "flex": "0 0 auto",
            "display": "flex",
            "justify-content": "center",
            "align-items": "center"
        },
        element_svg: {
            "width": "100%",
            "height": "100%"
        },
        progress_fixed: {
            "position": "absolute",
            "left": "0",
            "width": "100%"
        },
        progress_wrapper: {
            "position": "absolute",
            "top": "0",
            "left": "0",
            "width": "100%",
            "height": "100%"
        },
        progress_bar: {
            "position": "absolute",
            "left": "0"
        }
    };

    // Data Template
    var _dataTemplate = {
        "count": 0,
        "container": undefined,
        "settings": undefined,
        "wholePage": undefined,
        "resizeIntervalId": undefined,
        "text": undefined,
        "progress": undefined
    };

    // Whitelists
    var _whitelists = {
        animations: [
            "rotate_right",
            "rotate_left",
            "fadein",
            "pulse"
        ],
        progressPosition: [
            "top",
            "bottom"
        ]
    };

    // Default Values
    var _defaultValues = {
        animations: {
            name: "rotate_right",
            time: "2000ms"
        },
        fade: [400, 200]
    };


    $.LoadingOverlaySetup = function (settings) {
        $.extend(true, _defaults, settings);
    };

    $.LoadingOverlay = function (action, options) {
        switch (action.toLowerCase()) {
            case "show":
                Show("body", $.extend(true, {}, _defaults, options));
                break;

            case "hide":
                Hide("body", options);
                break;

            case "resize":
                Resize("body", options);
                break;

            case "text":
                Text("body", options);
                break;

            case "progress":
                Progress("body", options);
                break;
        }
    };

    $.fn.LoadingOverlay = function (action, options) {
        switch (action.toLowerCase()) {
            case "show":
                return this.each(function () {
                    Show(this, $.extend(true, {}, _defaults, options));
                });

            case "hide":
                return this.each(function () {
                    Hide(this, options);
                });

            case "resize":
                return this.each(function () {
                    Resize(this, options);
                });

            case "text":
                return this.each(function () {
                    Text(this, options);
                });

            case "progress":
                return this.each(function () {
                    Progress(this, options);
                });
        }
    };


    function Show(container, settings) {
        container = $(container);
        settings.size = _ParseSize(settings.size);
        settings.maxSize = parseInt(settings.maxSize, 10) || 0;
        settings.minSize = parseInt(settings.minSize, 10) || 0;
        settings.resizeInterval = parseInt(settings.resizeInterval, 10) || 0;

        var overlay = _GetOverlay(container);
        var data = _GetData(container);
        if (data === false) {
            // Init data
            data = $.extend({}, _dataTemplate);
            data.container = container;
            data.wholePage = container.is("body");

            // Overlay
            overlay = $("<div>", {
                "class": "loadingoverlay"
            })
                .css(_css.overlay)
                .css("flex-direction", settings.direction.toLowerCase() === "row" ? "row" : "column");
            if (settings.backgroundClass) {
                overlay.addClass(settings.backgroundClass);
            } else {
                overlay.css("background", settings.background);
            }
            if (data.wholePage) {
                overlay.css({
                    "position": "fixed",
                    "top": 0,
                    "left": 0,
                    "width": "100%",
                    "height": "100%"
                });
            }
            if (typeof settings.zIndex !== "undefined") overlay.css("z-index", settings.zIndex);

            // Image
            if (settings.image) {
                if ($.isArray(settings.imageColor)) {
                    if (settings.imageColor.length === 0) {
                        settings.imageColor = false;
                    } else if (settings.imageColor.length === 1) {
                        settings.imageColor = {
                            "fill": settings.imageColor[0]
                        };
                    } else {
                        settings.imageColor = {
                            "fill": settings.imageColor[0],
                            "stroke": settings.imageColor[1]
                        };
                    }
                } else if (settings.imageColor) {
                    settings.imageColor = {
                        "fill": settings.imageColor
                    };
                }
                var element = _CreateElement(overlay, settings.imageOrder, settings.imageAutoResize, settings.imageResizeFactor, settings.imageAnimation);
                if (settings.image.slice(0, 4).toLowerCase() === "<svg" && settings.image.slice(-6).toLowerCase() === "</svg>") {
                    // Inline SVG
                    element.append(settings.image);
                    element.children().css(_css.element_svg);
                    if (!settings.imageClass && settings.imageColor) element.find("*").css(settings.imageColor);
                } else if (settings.image.slice(-4).toLowerCase() === ".svg" || settings.image.slice(0, 14).toLowerCase() === "data:image/svg") {
                    // SVG file or base64-encoded SVG
                    $.ajax({
                        url: settings.image,
                        type: "GET",
                        dataType: "html",
                        global: false
                    }).done(function (data) {
                        element.html(data);
                        element.children().css(_css.element_svg);
                        if (!settings.imageClass && settings.imageColor) element.find("*").css(settings.imageColor);
                    });
                } else {
                    // Raster
                    element.css({
                        "background-image": "url(" + settings.image + ")",
                        "background-position": "center",
                        "background-repeat": "no-repeat",
                        "background-size": "cover"
                    });
                }
                if (settings.imageClass) element.addClass(settings.imageClass);
            }

            // Font Awesome
            if (settings.fontawesome) {
                var element = _CreateElement(overlay, settings.fontawesomeOrder, settings.fontawesomeAutoResize, settings.fontawesomeResizeFactor, settings.fontawesomeAnimation)
                    .addClass("loadingoverlay_fa");
                $("<div>", {
                    "class": settings.fontawesome
                }).appendTo(element);
                if (settings.fontawesomeColor) element.css("color", settings.fontawesomeColor);
            }

            // Custom
            if (settings.custom) {
                var element = _CreateElement(overlay, settings.customOrder, settings.customAutoResize, settings.customResizeFactor, settings.customAnimation)
                    .append(settings.custom);
            }

            // Text
            if (settings.text) {
                data.text = _CreateElement(overlay, settings.textOrder, settings.textAutoResize, settings.textResizeFactor, settings.textAnimation)
                    .addClass("loadingoverlay_text")
                    .text(settings.text);
                if (settings.textClass) {
                    data.text.addClass(settings.textClass);
                } else if (settings.textColor) {
                    data.text.css("color", settings.textColor);
                }
            }

            // Progress
            if (settings.progress) {
                var element = _CreateElement(overlay, settings.progressOrder, settings.progressAutoResize, settings.progressResizeFactor, false)
                    .addClass("loadingoverlay_progress");
                var wrapper = $("<div>")
                    .css(_css.progress_wrapper)
                    .appendTo(element);
                data.progress = {
                    bar: $("<div>").css(_css.progress_bar).appendTo(wrapper),
                    fixed: false,
                    margin: 0,
                    min: parseFloat(settings.progressMin),
                    max: parseFloat(settings.progressMax),
                    speed: parseInt(settings.progressSpeed, 10)
                };
                var progressPositionParts = (settings.progressFixedPosition + "").replace(/\s\s+/g, " ").toLowerCase().split(" ");
                if (progressPositionParts.length === 2 && _ValidateProgressPosition(progressPositionParts[0])) {
                    data.progress.fixed = progressPositionParts[0];
                    data.progress.margin = _ParseSize(progressPositionParts[1]);
                } else if (progressPositionParts.length === 2 && _ValidateProgressPosition(progressPositionParts[1])) {
                    data.progress.fixed = progressPositionParts[1];
                    data.progress.margin = _ParseSize(progressPositionParts[0]);
                } else if (progressPositionParts.length === 1 && _ValidateProgressPosition(progressPositionParts[0])) {
                    data.progress.fixed = progressPositionParts[0];
                    data.progress.margin = 0;
                }
                if (data.progress.fixed === "top") {
                    element
                        .css(_css.progress_fixed)
                        .css("top", data.progress.margin ? data.progress.margin.value + (data.progress.margin.fixed ? data.progress.margin.units : "%") : 0);
                } else if (data.progress.fixed === "bottom") {
                    element
                        .css(_css.progress_fixed)
                        .css("top", "auto");
                }
                if (settings.progressClass) {
                    data.progress.bar.addClass(settings.progressClass);
                } else if (settings.progressColor) {
                    data.progress.bar.css("background", settings.progressColor);
                }
            }

            // Fade
            if (!settings.fade) {
                settings.fade = [0, 0];
            } else if (settings.fade === true) {
                settings.fade = _defaultValues.fade;
            } else if (typeof settings.fade === "string" || typeof settings.fade === "number") {
                settings.fade = [settings.fade, settings.fade];
            } else if ($.isArray(settings.fade) && settings.fade.length < 2) {
                settings.fade = [settings.fade[0], settings.fade[0]];
            }
            settings.fade = [parseInt(settings.fade[0], 10), parseInt(settings.fade[1], 10)]


            // Save settings
            data.settings = settings;
            // Save data
            overlay.data("loadingoverlay_data", data);
            // Save reference to overlay
            container.data("loadingoverlay", overlay);


            // Resize
            overlay
                .fadeTo(0, 0.01)
                .appendTo("body");
            _IntervalResize(container, true);
            if (settings.resizeInterval > 0) {
                data.resizeIntervalId = setInterval(function () {
                    _IntervalResize(container, false);
                }, settings.resizeInterval);
            }

            // Show LoadingOverlay
            overlay.fadeTo(settings.fade[0], 1);
        }
        data.count++;
    }

    function Hide(container, force) {
        container = $(container);
        var overlay = _GetOverlay(container);
        var data = _GetData(container);
        if (data === false) return;

        data.count--;
        if (force || data.count <= 0) {
            overlay.animate({
                "opacity": 0
            }, data.settings.fade[1], function () {
                if (data.resizeIntervalId) clearInterval(data.resizeIntervalId);
                $(this).remove();
                container.removeData("loadingoverlay");
            });
        }
    }

    function Resize(container) {
        _IntervalResize($(container), true);
    }

    function Text(container, value) {
        container = $(container);
        var data = _GetData(container);
        if (data === false || !data.text) return;

        if (value === false) {
            data.text.hide();
        } else {
            data.text
                .show()
                .text(value);
        }
    }

    function Progress(container, value) {
        container = $(container);
        var data = _GetData(container);
        if (data === false || !data.progress) return;

        if (value === false) {
            data.progress.bar.hide();
        } else {
            var v = ((parseFloat(value) || 0) - data.progress.min) * 100 / (data.progress.max - data.progress.min);
            if (v < 0) v = 0;
            if (v > 100) v = 100;
            data.progress.bar
                .show()
                .animate({
                    "width": v + "%"
                }, data.progress.speed);
        }
    }


    function _IntervalResize(container, force) {
        var overlay = _GetOverlay(container);
        var data = _GetData(container);
        if (data === false) return;

        // Overlay
        if (!data.wholePage) {
            var isFixed = container.css("position") === "fixed";
            var pos = isFixed ? container[0].getBoundingClientRect() : container.offset();
            overlay.css({
                "position": isFixed ? "fixed" : "absolute",
                "top": pos.top + parseInt(container.css("border-top-width"), 10),
                "left": pos.left + parseInt(container.css("border-left-width"), 10),
                "width": container.innerWidth(),
                "height": container.innerHeight()
            });
        }

        // Elements
        if (data.settings.size) {
            var c = data.wholePage ? $(window) : container;
            var size = data.settings.size.value;
            if (!data.settings.size.fixed) {
                size = Math.min(c.innerWidth(), c.innerHeight()) * size / 100;
                if (data.settings.maxSize && size > data.settings.maxSize) size = data.settings.maxSize;
                if (data.settings.minSize && size < data.settings.minSize) size = data.settings.minSize;
            }
            overlay.children(".loadingoverlay_element").each(function () {
                var $this = $(this);
                if (force || $this.data("loadingoverlay_autoresize")) {
                    var resizeFactor = $this.data("loadingoverlay_resizefactor");
                    if ($this.hasClass("loadingoverlay_fa") || $this.hasClass("loadingoverlay_text")) {
                        $this.css("font-size", (size * resizeFactor) + data.settings.size.units);
                    } else if ($this.hasClass("loadingoverlay_progress")) {
                        data.progress.bar.css("height", (size * resizeFactor) + data.settings.size.units);
                        if (!data.progress.fixed) {
                            data.progress.bar
                                .css("top", $this.position().top)
                                .css("top", "-=" + (size * resizeFactor * 0.5) + data.settings.size.units);
                        } else if (data.progress.fixed === "bottom") {
                            $this
                                .css("bottom", data.progress.margin ? data.progress.margin.value + (data.progress.margin.fixed ? data.progress.margin.units : "%") : 0)
                                .css("bottom", "+=" + (size * resizeFactor) + data.settings.size.units);
                        }
                    } else {
                        $this.css({
                            "width": (size * resizeFactor) + data.settings.size.units,
                            "height": (size * resizeFactor) + data.settings.size.units
                        });
                    }
                }
            });
        }
    }


    function _GetOverlay(container) {
        return container.data("loadingoverlay");
    }

    function _GetData(container) {
        var overlay = _GetOverlay(container);
        var data = (typeof overlay === "undefined") ? undefined : overlay.data("loadingoverlay_data");
        if (typeof data === "undefined") {
            // Clean DOM
            $(".loadingoverlay").each(function () {
                var $this = $(this);
                var data = $this.data("loadingoverlay_data");
                if (!document.body.contains(data.container[0])) {
                    if (data.resizeIntervalId) clearInterval(data.resizeIntervalId);
                    $this.remove();
                }
            });
            return false;
        } else {
            overlay.toggle(container.is(":visible"));
            return data;
        }
    }


    function _CreateElement(overlay, order, autoResize, resizeFactor, animation) {
        var element = $("<div>", {
            "class": "loadingoverlay_element",
            "css": {
                "order": order
            }
        })
            .css(_css.element)
            .data({
                "loadingoverlay_autoresize": autoResize,
                "loadingoverlay_resizefactor": resizeFactor
            })
            .appendTo(overlay);

        // Parse animation
        if (animation === true) animation = _defaultValues.animations.time + " " + _defaultValues.animations.name;
        if (typeof animation === "string") {
            var animationName;
            var animationTime;
            var parts = animation.replace(/\s\s+/g, " ").toLowerCase().split(" ");
            if (parts.length === 2 && _ValidateCssTime(parts[0]) && _ValidateAnimation(parts[1])) {
                animationName = parts[1];
                animationTime = parts[0];
            } else if (parts.length === 2 && _ValidateCssTime(parts[1]) && _ValidateAnimation(parts[0])) {
                animationName = parts[0];
                animationTime = parts[1];
            } else if (parts.length === 1 && _ValidateCssTime(parts[0])) {
                animationName = _defaultValues.animations.name;
                animationTime = parts[0];
            } else if (parts.length === 1 && _ValidateAnimation(parts[0])) {
                animationName = parts[0];
                animationTime = _defaultValues.animations.time;
            }
            element.css({
                "animation-name": "loadingoverlay_animation__" + animationName,
                "animation-duration": animationTime,
                "animation-timing-function": "linear",
                "animation-iteration-count": "infinite"
            });
        }

        return element;
    }

    function _ValidateCssTime(value) {
        return !isNaN(parseFloat(value)) && (value.slice(-1) === "s" || value.slice(-2) === "ms");
    }

    function _ValidateAnimation(value) {
        return _whitelists.animations.indexOf(value) > -1;
    }

    function _ValidateProgressPosition(value) {
        return _whitelists.progressPosition.indexOf(value) > -1;
    }


    function _ParseSize(value) {
        if (!value || value < 0) {
            return false;
        } else if (typeof value === "string" && ["vmin", "vmax"].indexOf(value.slice(-4)) > -1) {
            return {
                fixed: true,
                units: value.slice(-4),
                value: value.slice(0, -4)
            };
        } else if (typeof value === "string" && ["rem"].indexOf(value.slice(-3)) > -1) {
            return {
                fixed: true,
                units: value.slice(-3),
                value: value.slice(0, -3)
            };
        } else if (typeof value === "string" && ["px", "em", "cm", "mm", "in", "pt", "pc", "vh", "vw"].indexOf(value.slice(-2)) > -1) {
            return {
                fixed: true,
                units: value.slice(-2),
                value: value.slice(0, -2)
            };
        } else {
            return {
                fixed: false,
                units: "px",
                value: parseFloat(value)
            };
        }
    }


    $(function () {
        $("head").append([
            "<style>",
            "@-webkit-keyframes loadingoverlay_animation__rotate_right {",
            "to {",
            "-webkit-transform : rotate(360deg);",
            "transform : rotate(360deg);",
            "}",
            "}",
            "@keyframes loadingoverlay_animation__rotate_right {",
            "to {",
            "-webkit-transform : rotate(360deg);",
            "transform : rotate(360deg);",
            "}",
            "}",

            "@-webkit-keyframes loadingoverlay_animation__rotate_left {",
            "to {",
            "-webkit-transform : rotate(-360deg);",
            "transform : rotate(-360deg);",
            "}",
            "}",
            "@keyframes loadingoverlay_animation__rotate_left {",
            "to {",
            "-webkit-transform : rotate(-360deg);",
            "transform : rotate(-360deg);",
            "}",
            "}",

            "@-webkit-keyframes loadingoverlay_animation__fadein {",
            "0% {",
            "opacity   : 0;",
            "-webkit-transform : scale(0.1, 0.1);",
            "transform : scale(0.1, 0.1);",
            "}",
            "50% {",
            "opacity   : 1;",
            "}",
            "100% {",
            "opacity   : 0;",
            "-webkit-transform : scale(1, 1);",
            "transform : scale(1, 1);",
            "}",
            "}",
            "@keyframes loadingoverlay_animation__fadein {",
            "0% {",
            "opacity   : 0;",
            "-webkit-transform : scale(0.1, 0.1);",
            "transform : scale(0.1, 0.1);",
            "}",
            "50% {",
            "opacity   : 1;",
            "}",
            "100% {",
            "opacity   : 0;",
            "-webkit-transform : scale(1, 1);",
            "transform : scale(1, 1);",
            "}",
            "}",

            "@-webkit-keyframes loadingoverlay_animation__pulse {",
            "0% {",
            "-webkit-transform : scale(0, 0);",
            "transform : scale(0, 0);",
            "}",
            "50% {",
            "-webkit-transform : scale(1, 1);",
            "transform : scale(1, 1);",
            "}",
            "100% {",
            "-webkit-transform : scale(0, 0);",
            "transform : scale(0, 0);",
            "}",
            "}",
            "@keyframes loadingoverlay_animation__pulse {",
            "0% {",
            "-webkit-transform : scale(0, 0);",
            "transform : scale(0, 0);",
            "}",
            "50% {",
            "-webkit-transform : scale(1, 1);",
            "transform : scale(1, 1);",
            "}",
            "100% {",
            "-webkit-transform : scale(0, 0);",
            "transform : scale(0, 0);",
            "}",
            "}",
            "</style>"
        ].join(" "));
    });

}));