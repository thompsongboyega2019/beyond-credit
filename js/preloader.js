(function ($) {
  "use strict";

  /*============= preloader js css =============*/
  $(window).on("load", function () {
    setTimeout(function () {
      $("#preloader").fadeOut(400, function () {
        $("#preloader").removeClass("loading");
      });
    }, 400);
  });
})(jQuery);
