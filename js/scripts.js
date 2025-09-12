
function menuToggle() {
  var x = document.getElementById('myNavtoggle');
  if (x.className === 'navtoggle') {
    x.className += ' responsive';
  } else {
    x.className = 'navtoggle';
  }
}

$(document).ready(function () {
  $('a[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .on('click', function (event) {
      // same-page link?
      if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        // element to scroll to
        let target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        if (target.length) {
          event.preventDefault();

          const headerHeight = $('header').outerHeight() || 0; // adjust for fixed header
          $('html, body').animate(
            { scrollTop: target.offset().top - headerHeight },
            600
          );
        }
      }
      const coll = document.querySelector(".collapsible");
      const content = document.querySelector(".content");




      


      


    });
});