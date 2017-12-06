'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var clickedElement = null;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
  var mapPins = map.querySelector('.map__pins');
  var mapCard = map.querySelector('.popup');

  var isMapPin = function (classList) {
    return classList.contains('map__pin') && !classList.contains('map__pin--main');
  };

  var showAd = function (evt) {
    if (evt.target !== evt.currentTarget) {
      var pinClicked = isMapPin(evt.target.classList);
      var imageClicked = isMapPin(evt.target.parentElement .classList);
      if (pinClicked || imageClicked) {
        if (clickedElement) {
          clickedElement.classList.remove('map__pin--active');
        }
        clickedElement = pinClicked ? evt.target : evt.target.parentElement;
        clickedElement.classList.add('map__pin--active');
        window.card.renderAd(window.data.getAds[clickedElement.id]);
        mapCard = map.querySelector('.popup');
        mapCard.removeAttribute('hidden');
      }
    }
    evt.stopPropagation();
  };

  var hideAd = function () {
    mapCard.setAttribute('hidden', '');
    if (clickedElement) {
      clickedElement.classList.remove('map__pin--active');
    }
  };

  var onMapPin = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
      showAd(evt);
    }
  };

  var onClosePopup = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
      hideAd(evt);
    }
  };

  var onMapKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideAd();
    }
  };

  var renderMap = (function () {
    window.pin.renderPins(window.data.getAds);
    window.data.disableFormFields(noticeFormFieldset);
    window.card.renderAd(window.data.getAds[0]);
    var closePopup = map.querySelector('.popup__close');
    mapPinMain.addEventListener('mouseup', window.pin.onMainPinClick);
    closePopup.addEventListener('click', onClosePopup);
    closePopup.addEventListener('keydown', onClosePopup);
    document.addEventListener('keydown', onMapKeydown);
    mapPins.addEventListener('click', onMapPin, false);
    mapPins.addEventListener('keydown', onMapPin);
  })();

  window.map = {
    renderMap: renderMap
  };
})();
