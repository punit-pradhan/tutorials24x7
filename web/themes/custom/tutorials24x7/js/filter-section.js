(function filterBlock($, Drupal, once) {
  let filterState = [];

  /**
   * Whenever the input element is checked, the filter section HTML is recreated and
   * all levels show closed. To handle this scenario, store states (opened or closed)
   * of levels in a module global variable now whenever the input element is clicked,
   * based on variable values, filter will looks the same way before HTML recreated.
   *
   * @param {String} newItem
   *   The name of category which level is clicked.
   * @param {String} newLevel
   *   The name of level which level is clicked.
   */
  function storeFilterState(newItem, newLevel) {
    const levelIndex = filterState.findIndex(obj => obj.level === newLevel);
    const itemIndex = filterState.findIndex(obj => obj.item === newItem);
    // If same category and level not exist than add it.
    if (itemIndex === -1 && levelIndex === -1) {
      filterState.push({ item: newItem, level: newLevel });
    } else if (itemIndex !== -1) {
      // If category exists in array means clicked on opened level so remove it.
      filterState.splice(levelIndex, 1);
      // Remove its second level too if opened.
      const secondLevel = filterState.findIndex(obj => obj.level === 'secondLevel');
      if (secondLevel !== -1) {
        filterState.splice(secondLevel, 1);
      }
    } else if (itemIndex === -1 && levelIndex !== -1) {
      // If category does not exist but the same level exists means clicked on another
      // category of the same level so remove the stored state and add the clicked state.
      filterState.splice(levelIndex, 1);
      const secondLevel = filterState.findIndex(obj => obj.level === 'secondLevel');
      // Remove its second level too if opened.
      if (secondLevel !== -1) {
        filterState.splice(secondLevel, 1);
      }
      filterState.push({ item: newItem, level: newLevel });
    }
  }

  /**
   * When the input element clicked, html is recreated, and updateCount() called and
   * we can get the total count of checked input.
   *
   * @param {HTMLElement} context
   *   When input clicked the context has the HTML load via Ajax.
   */
  function updateCount(context) {
    var count = $('.facets-checkbox:checked', context).length;
    $('.filter_section__title__count', context).text(count);
  }

  Drupal.behaviors.filterBlock = {
    attach: function attachCollapsibleOnFilterBlock(context) {
      // Call updateCount whenever html is recreated.
      updateCount(context);

      // Remove input and link elements from the first and second level to display only text.
      $(".item-list__checkbox .facet-item").each(function () {
        if ($(this).hasClass('facet-item--expanded')) {
          $('> input', this).remove();
          $('> a', this).remove();
        }
      });

      // When clicking the first level open it and close all other opened first level.
      // If the first level already opened then close first level and second level (if exists).
      once('firstLevel', '.item-list__checkbox > .facet-item--expanded', context).forEach(function attachFirstLevel(element) {
        $(element).on('click', function handleFirstLevel(event) {
          // Handle icons.
          $('.item-list__checkbox > .facet-item--expanded').not(element).find(' > label').removeClass('first-level');
          $('.item-list__checkbox > .facet-item--expanded .facet-item--expanded > label').removeClass('second-level');
          $('> label', element).toggleClass('first-level');
          // Hide other first level.
          $('.item-list__checkbox > .facet-item--expanded').not(element).find('.facet-item--expanded > label').hide();
          $('.item-list__checkbox > .facet-item--expanded').not(element).find('.facet-item:not(.facet-item--expanded)').hide();
          storeFilterState($('> label', element).attr('for'), 'firstLevel');
          // Check first level has second level.
          let secondLevel = $('.facet-item--expanded > label', element);
          let inputElement = $('.facet-item:not(.facet-item--expanded)', element);
          if (secondLevel.length !== 0 && inputElement.length !== 0) {
            secondLevel.slideToggle();
            inputElement.hide();
          } else if (inputElement.length !== 0) {
            // Check first element has only input.
            inputElement.slideToggle();
          }
        })
      });

      // When clicking the second level open it and close all other opened second level.
      // If the second level is already opened then close the second level.
      once('secondLevel', '.item-list__checkbox > .facet-item--expanded .facet-item--expanded > label', context).forEach(function attachFirstLevel(element) {
        $(element).on('click', function handleSecondLevel(event) {
          event.stopPropagation();
          // Handle icons.
          $('.item-list__checkbox > .facet-item--expanded .facet-item--expanded > label').not(element).removeClass('second-level');
          $(element).toggleClass('second-level');
          // Hide other second level.
          $('.item-list__checkbox > .facet-item--expanded .facet-item--expanded > label').not(element).find('+ .facets-widget- .facet-item').hide();
          // Toggle clicked second level element.
          $('+ .facets-widget- .facet-item', element).slideToggle();
          storeFilterState($(element).attr('for'), 'secondLevel');
        })
      });

      // After html is recreated, open previous levels based on the filterState array.
      // If filterState has one object, it means only the first level is opened. If
      // filterState has two objects, it means both the first and second level opened.
      if (filterState.length == 1) {
        $("label[for='" + filterState[0].item + "']").addClass('first-level');
        if ($("label[for='" + filterState[0].item + "'] + .facets-widget- .facet-item--expanded").length !== 0) {
          $("label[for='" + filterState[0].item + "'] + .facets-widget- > ul > li > label").show();
        } else if ($("label[for='" + filterState[0].item + "'] + .facets-widget- .facet-item:not(.facet-item--expanded)").length !== 0) {
          $("label[for='" + filterState[0].item + "'] + .facets-widget- > ul > li").show();
        }
      } else if (filterState.length == 2) {
        $("label[for='" + filterState[0].item + "']").addClass('first-level');
        $("label[for='" + filterState[1].item + "']").addClass('second-level');
        $("label[for='" + filterState[0].item + "'] + .facets-widget- > ul > li > label").show();
        $("label[for='" + filterState[1].item + "'] + .facets-widget- > ul > li").show();
      }

      // Prevent trigger of click event of the above elements when clicking input element.
      once('inputElement', '.facet-item:not(.facet-item--expanded)', context).forEach(function attachInputElement(element) {
        $(element).on('click', function handleInputElement(event) {
          event.stopPropagation();
        })
      });

      // Display overlay on mobile when clicking filter label.
      if (window.matchMedia("(max-width: 767px)").matches) {
        once('filterLabel', '.filter_section__title__label', context).forEach(function attachFilterLabel(element) {
          $(element).on('click', function handleFilterLabel(event) {
            $('.filter-wrapper').css('position', 'fixed');
            $('.filter-wrapper').removeClass('hideOverlay');
            $('.filter-wrapper').addClass('showOverlay');
          })
        });
      }

      // Hide overlay on mobile when clicking a cross icon.
      once('closefilterOverlay', '.filter_section__close', context).forEach(function attachClosefilterOverlay(element) {
        $(element).on('click', function handleClosefilterOverlay(event) {
          $('.filter-wrapper').removeClass('showOverlay');
          $('.filter-wrapper').addClass('hideOverlay');
          setTimeout(function () {
            $('.filter-wrapper').css('position', 'static');
          }, 400)
        })
      });
    }
  }
})(jQuery, Drupal, once);
