(function ($, Drupal, drupalSettings) {
  // Function to update the image source based on the current theme mode.
  function updateImageSource(theme) {
    var logoImg = $('.navbar-brand .site-logo img'); // Select the logo image.
    var imagePath = '/themes/custom/tutorials24x7/images/logo'; // Base path for the image.

    // Update the image path and alt text based on the theme.
    if (theme === 'dark') {
      imagePath += '_dark.svg'; // Append the dark mode suffix.
      logoImg.attr('alt', 'Home (Dark Mode)'); // Set alt text for dark mode.
    } else {
      imagePath += '_light.svg'; // Append the light mode suffix.
      logoImg.attr('alt', 'Home (Light Mode)'); // Set alt text for light mode.
    }

    logoImg.attr('src', imagePath); // Update the image source.
  }

  // Function to handle the theme change.
  function handleThemeChange(event) {
    var toggleSwitch = $(this); // Get the checkbox element.
    if (toggleSwitch.prop('checked')) {
      // Dark mode enabled.
      $('html').attr('data-theme', 'dark'); // Set the HTML attribute for dark mode.
      localStorage.setItem('theme', 'dark'); // Store the theme mode in local storage.
      updateImageSource('dark'); // Update the image source for dark mode.
    } else {
      // Light mode enabled.
      $('html').attr('data-theme', 'light'); // Set the HTML attribute for light mode.
      localStorage.setItem('theme', 'light'); // Store the theme mode in local storage.
      updateImageSource('light'); // Update the image source for light mode.
    }
  }

  // Drupal behavior to attach the theme mode functionality.
  Drupal.behaviors.themeMode = {
    attach: function themeModeAttach(context) {
      var toggleSwitch = $('.block-theme-switcher input[type="checkbox"]', context); // Select the theme switcher checkbox.
      toggleSwitch.on('change', handleThemeChange); // Attach change event handler for theme switcher.

      var savedTheme = localStorage.getItem('theme'); // Get the saved theme mode from local storage.
      if (savedTheme) {
        $('html').attr('data-theme', savedTheme); // Set the HTML attribute based on the saved theme mode.
        toggleSwitch.prop('checked', savedTheme === 'dark'); // Set the checkbox state based on the saved theme mode.
        updateImageSource(savedTheme); // Update the image source based on the saved theme mode.
      }
    },
  };
})(jQuery, Drupal, drupalSettings);
