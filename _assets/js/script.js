document.addEventListener('DOMContentLoaded', function() {

  /**
   * Page transitions
   */

  // Fade in
  setTimeout(function() {
    document.body.classList.remove('is-fading-in');
  }, 500)

  // Fade out
  var relativeLinks = document.querySelectorAll('a[href^="/"]');

  for (var i = 0; i < relativeLinks.length; i++) {
    relativeLinks[i].addEventListener('click', function (e) {
      if (e.shiftKey || e.ctrlKey || e.altKey || e.metaKey) { return; }

      e.preventDefault();
      document.body.classList.add('is-fading-out');
      var link = this.href;

      setTimeout(function () {
        window.location = link;
      }, 500);
    });
  }

  /**
   * Mobile nav
   */

  document.getElementById('js-mobile-nav-toggle').addEventListener('click', function() {
    this.classList.toggle('is-active');
    this.nextSibling.classList.toggle('is-active');
  });

});

/**
 * Smoother load-in transitions for iframes
 */
document.onreadystatechange = function () {
  // Normal iframes
  if (document.readyState === 'interactive') {
    var iframes = document.querySelectorAll('iframe');

    for (var i = 0; i < iframes.length; i++) {
      iframes[i].style.opacity = 0;

      iframes[i].addEventListener('load', function (e) {
        this.classList.add('is-fading-in');
        this.style.animationDuration = '.6s';
      });
    }
  }
  // Facebook embeds
  if (document.readyState === 'complete') {
    if (typeof FB !== 'undefined') {
      FB.Event.subscribe('xfbml.render', function(response) {
        var iframes = document.querySelectorAll('.fb_iframe_widget iframe');

        for (var i = 0; i < iframes.length; i++) {
          iframes[i].classList.add('is-fading-in');
          iframes[i].style.animationDuration = '1s';
        }
      });
    }
  }
}
