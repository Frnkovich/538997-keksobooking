'use strict';

(function () {
  window.showCard = function (evt, pinClicked) {
    if (window.data.clickedElement) {
      window.data.clickedElement.classList.remove('map__pin--active');
    }
    window.data.clickedElement = pinClicked ? evt.target : evt.target.parentElement;
    window.data.clickedElement.classList.add('map__pin--active');
    window.card.renderAd(window.data.getAds[window.data.clickedElement.id]);
  };
})();
