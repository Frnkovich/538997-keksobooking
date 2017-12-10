'use strict';

(function () {
  window.showCard = function (clickedPin) {
    if (window.data.clickedElement) {
      window.data.clickedElement.classList.remove('map__pin--active');
    }
    window.data.clickedElement = clickedPin;
    window.data.clickedElement.classList.add('map__pin--active');
    window.card.renderAd(window.data.ads[window.data.clickedElement.id]);
  };
})();
