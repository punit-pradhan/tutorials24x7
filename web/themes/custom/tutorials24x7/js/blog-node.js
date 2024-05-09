(function blogNode($, Drupal, once) {
  Drupal.behaviors.blogNodes = {
    attach: function attachNodeAlignment(context) {
      once("nodeAlignment", ".node--type-blog.node--view-mode-full", context).forEach(function handlehNodeAlignment() {
        const node = $(".node--type-blog.node--view-mode-full");
        // If tag not exist then align author with page content.
        if (node.find('.field--name-field-blog-tags').length == 0) {
          node.find('.field--name-uid').addClass('without-tags');
        }
      });
    }
  };
})(jQuery, Drupal, once);
