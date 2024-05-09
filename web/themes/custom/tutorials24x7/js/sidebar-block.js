(function sidebarBlock($, Drupal, once) {
  Drupal.behaviors.sidebarBlock = {
    attach: function applyStickyOnsidebarBlock(context) {
      once('sidebarBlock', 'html').forEach(function applyStickyOnsidebarBlock() {
        // Check if viewport width is greater than 991 pixels
        if (window.matchMedia("(min-width: 991px)").matches) {
          var regionSidebarHeight = $('.region-sidebar-second', context).outerHeight();
          var googleAdsHeight = $('.advertise-blog-sidebar', context).outerHeight();
          // Here we add 88px in google ads which is sum of extra margin and spacing.
          $('.block-recommend-ai .item-list', context).css('height', regionSidebarHeight - (googleAdsHeight + 88) + 'px');
        }
      });
    }
  };
})(jQuery, Drupal, once);
