(function () {
  'use strict';

  // Set focus on text field on start
  $('input[type=text]').focus();

  function noteDownThought() {
    // Append thought to DOM if text field is not empty
    if ($('input[type=text]').val() !== '') {
      $('.thoughts').append('<div class="thought">' + $('input[type=text]').val() + '</div>');
      // Clear text field
      $('input[type=text]').val('');
    }
  }

  // Event Listener to toggle visibility of thoughts
  $('.view-button').click(function() {
    // Sets focus on text field when it's visible
    $('input[type=text]').focus();

    // Shows/Hides text field
    $('input[type=text]').toggleClass('fadeOutUp fadeOutDown');

    // Toggles appropriate icon depending on the app's state
    $('.fa')
      .toggleClass('fa-eye')
      .toggleClass('fa-eye-slash');

    // Shows/Hides thoughts
    $('.thoughts')
      .toggleClass('fadeInUp')
      .toggleClass('fadeOutDown')
      .toggleClass('invisible');

    // Fix that hides the scrollbar otherwise present due to animate.css
    setTimeout(function() {
      if ($('.thoughts').hasClass('invisible')) {
        $('.thoughts').css('display', 'none');
      } else {
        $('.thoughts').css('display', 'block');
      }
    }, 300);
  });

  var hyphenCount = 0;
  $('input[type=text]').on('keypress', function(e) {
    switch (e.which) {
      // Enter
      case 13:
        // Commit thought
        noteDownThought();
        break;

      // Hyphen
      case 45:
        // Converts -- to an em dash
        if (++hyphenCount === 2) {
          // Timeout stops value being read before
          // the second keyup
          setTimeout(function() {
            var original = $('input[type=text]').val();
            $('input[type=text]').val(original.replace('--', '—'));
          }, 10);
          hyphenCount = 0;
        }
        break;

      default:
        count = 0;
        break;
    }
  });
})();
