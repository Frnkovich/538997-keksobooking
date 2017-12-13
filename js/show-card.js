'use strict';

(function () {
  window.showCard = function (clickedPin) {
    if (window.data.activePin) {
      window.data.activePin.classList.remove('map__pin--active');
    }
    window.data.activePin = clickedPin;
    window.data.activePin.classList.add('map__pin--active');
    window.card.renderAd(window.data.getAd(window.data.activePin.id));
  };
})();
