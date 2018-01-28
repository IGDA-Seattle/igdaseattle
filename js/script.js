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
