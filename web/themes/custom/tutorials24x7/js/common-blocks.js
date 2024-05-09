// Initialize Drupal behavior using jQuery, Drupal, and once.
(function initDrupalBehavior($, Drupal, once) {
  // Define Drupal behavior for common block functionality.
  Drupal.behaviors.commonblock = {
    // Function to attach behavior to the context.
    attach: function attachCommonBlockBehavior(context) {
      // Click event for .header-items-close-btn.
      once('commonblock', '.header-items-close-btn', context).forEach(function attachMainMenuCloseBtnClickEvent(element) {
        $(element).on('click', function handleMainMenuCloseBtnClick() {
          if (window.matchMedia("(max-width: 991px)").matches) {
            // Toggle visibility of elements.
            $('body', context).toggleClass('stop-scroll');
            $('.header-items-close-btn, .search-box-icon, .multilingual-icon, .navbar-hamburger-menu', context).toggle();
          }
        });
      });

      // Click event for .navbar-hamburger-menu.
      once('commonblock', '.navbar-hamburger-menu', context).forEach(function attachMainMenuHamburgerClickEvent(element) {
        $(element).on('click', function handleMainMenuHamburgerClick() {
          // Toggle visibility of elements.
          if (window.matchMedia("(max-width: 991px)").matches) {
            $('body', context).toggleClass('stop-scroll');
            $('.region-nav-main', context).slideDown();
            $('.header-items-close-btn, .search-box-icon, .multilingual-icon, .navbar-hamburger-menu', context).toggle();
          }
        });
      });

      // Click event for .main-menu-level-0 and .main-menu-level-1.
      once('commonblock', '.main-menu-level-0, .main-menu-level-1, .main-level-1', context).forEach(function attachMainMenuClickEvent(element) {
        $(element).on('click', function handleMainMenuClick(event) {
          let $this = $(this);

          // Close all other open menus and submenus.
          $('.main-menu-level-0, .main-menu-level-1', context).not($this).removeClass('main-menu-active');
          $('.main-menu-level-1-wrapper', context).not($this.find('.main-menu-level-1-wrapper')).removeClass('main-menu-show');
          $('.main-menu-level-0, .main-menu-level-1', context).removeClass('main-menu-mobile-active');
          // Toggle the active state and show/hide submenu for the clicked element.
          $this.toggleClass('main-menu-active');
          $this.find('.main-menu-level-1-wrapper').toggleClass('main-menu-show');

          if ($this.hasClass('main-menu-active')) {
            $('.main-menu-level-0, .main-menu-level-1', context).not($this).addClass('main-menu-mobile-active');
          }
          // Check if the clicked element is .main-menu-level-1.
          if ($(event.target).hasClass('main-level-1') && window.matchMedia("(max-width: 991px)").matches) {
            // Close all other open submenus.
            // Toggle the active state and show/hide submenu for the clicked '.main-menu-level-1' element.
            $(event.target).toggleClass('main-menu-second-level-active').siblings().removeClass('main-menu-second-level-active');
          }
        });
      });

      // Check each .main-menu-level-1 for .main-menu-level-2 and number of children.
      $('.main-menu-level-1', context).each(function checkMainMenuLevel1() {
        var $this = $(this);
        // If .main-menu-level-1 contains .main-menu-level-2, add the 'gap' class.
        if ($this.find('.main-menu-level-2').length > 0) {
          $this.addClass('gap');
        }

        // Add class based on the number of children.
        var numChildren = $this.children('li').length;
        $this.addClass('item-' + numChildren);
      });

      // Click event for .search-box-icon.
      // Apply your JavaScript code only to the specific HTML structure.
      once('commonblock', '.search-box-icon', context).forEach(function attachSearchBoxClickEvent(element) {
        $(element).on('click', function handleSearchBoxClick() {
          // Toggle the 'SearchBox-menu-active' class for the clicked '.search-box-icon' element.
          $(this).toggleClass('SearchBox-menu-active');
          $('#views-exposed-form-blog-category-listing-search', context).addClass('SearchBox-menu-show');

          // Add the header-mobile-show class to .header-items-close-btn.
          if (window.matchMedia("(max-width: 991px)").matches) {
            $('body', context).toggleClass('stop-scroll');
            $('#views-exposed-form-blog-category-listing-search', context).slideDown();
            $('.header-items-close-btn, .search-box-icon, .multilingual-icon, .navbar-hamburger-menu', context).toggle();
          }
          else {
            $('#views-exposed-form-blog-category-listing-search', context).toggle();
          }
        });
      });

      // Click event for .multilingual-icon.
      if ($('#block-tutorials24x7-gtranslate', context).length) {
        // Apply your JavaScript code only to the specific HTML structure.
        once('commonblock', '.multilingual-icon', context).forEach(function attachMultilingualClickEvent(element) {
          $(element).on('click', function handleMultilingualClick() {
            // Toggle the 'multilingual-menu-active' class for the clicked '.multilingual-icon' element.
            $(this).toggleClass('multilingual-menu-active');

            // Add the header-mobile-show class to .header-items-close-btn.
            if (window.matchMedia("(max-width: 991px)").matches) {
              $('body', context).toggleClass('stop-scroll');
              $('.header-items-close-btn, .search-box-icon, .multilingual-icon, .navbar-hamburger-menu', context).toggle();
              $('.gtranslate_wrapper', context).slideDown();
            }
            else {
              // Toggle the 'multilingual-menu-show' class for '.gtranslate_wrapper'.
              $('.gtranslate_wrapper', context).toggleClass('multilingual-menu-show');
            }
          });
        });
      }

      // Click event to remove active classes when clicking outside the menu.
      $(document).on('click', function handleDocumentClick(e) {
        var $target = $(e.target);

        if (!$target.closest('#navbarSupportedContent').length) {
          if (window.matchMedia("(max-width: 991px)").matches) {
            $('.region-nav-main', context).slideUp();
          }
          // Remove active classes from menu items and submenus.
          $('.main-menu-level-0, .main-menu-level-1', context).removeClass('main-menu-active main-menu-mobile-active');
          $('.main-menu-level-1-wrapper', context).removeClass('main-menu-show');
        }
        if (!$target.closest('#block-tutorials24x7-gtranslate').length) {
          // Remove active class from '.multilingual-icon' and hide '.gtranslate_wrapper.gt_container--rvaygv'.
          $('.multilingual-icon', context).removeClass('multilingual-menu-active');
          if (window.matchMedia("(max-width: 991px)").matches) {
            $('.gtranslate_wrapper', context).slideUp();
          } else {
            $('.gtranslate_wrapper', context).removeClass('multilingual-menu-show');
          }
        }
        if (!$target.closest('#block-tutorials24x7-views-exposed-search-block').length) {
          // Remove active class from '.multilingual-icon' and hide '.gtranslate_wrapper.gt_container--rvaygv'.
          $('.search-box-icon', context).removeClass('SearchBox-menu-active');

          if (window.matchMedia("(max-width: 991px)").matches) {
            $('#views-exposed-form-blog-category-listing-search', context).slideUp();
          }
          else {
            $('#views-exposed-form-blog-category-listing-search', context).hide();
          }
        }
        if (!$target.closest('.header-items').length && window.matchMedia("(max-width: 991px)").matches) {
          // Remove active class from '.multilingual-icon' and hide '.gtranslate_wrapper'.
          $('.header-items-close-btn', context).hide();
          $('body', context).removeClass('stop-scroll');
          $('.search-box-icon, .multilingual-icon, .navbar-hamburger-menu', context).show();
        }
      });
    }
  };

  Drupal.behaviors.searchForm = {
    attach: function attachSearchFormBehavior(context) {
      once('searchForm', '#views-exposed-form-blog-category-listing-search', context).forEach(function attacSearchFormCrossClickEvent(element) {
        let img = $('<img>');
        img.attr("src", "/themes/custom/tutorials24x7/images/search-cross.svg");
        img.attr("alt", "Cross");
        img.attr("class", "search-cross-icon");
        $(element).find('.form-type-textfield').append(img);
        $(element).find('img').on('click', function clearSearchField() {
          $(element).find('.form-text').val('');
        });
      });
    }
  }
})(jQuery, Drupal, once);
