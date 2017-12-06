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

  var isMapPin = function (classList) {
    return classList.contains('map__pin') && !classList.contains('map__pin--main');
  };

  var openMapCard = function (evt) {
    if (evt.target !== evt.currentTarget) {
      var pinClicked = isMapPin(evt.target.classList);
      var imageClicked = isMapPin(evt.target.parentElement .classList);
      if (pinClicked || imageClicked) {
        if (clickedElement) {
          clickedElement.classList.remove('map__pin--active');
        }
        clickedElement = pinClicked ? evt.target : evt.target.parentElement;
        clickedElement.classList.add('map__pin--active');
        window.card.renderMapCard(window.data.ads[clickedElement.id]);
        mapCard = map.querySelector('.popup');
        mapCard.removeAttribute('hidden');
      }
    }
    evt.stopPropagation();
  };

  var closeMapCard = function () {
    mapCard.setAttribute('hidden', '');
    if (clickedElement) {
      clickedElement.classList.remove('map__pin--active');
    }
  };

  var onMapPin = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
      openMapCard(evt);
    }
  };

  var onClosePopup = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
      closeMapCard(evt);
    }
  };

  var onMapKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeMapCard();
    }
  };

  window.pin.renderPins(window.data.ads);
  window.data.disableFields(noticeFormFieldset);
  window.card.renderMapCard(window.data.ads[0]);
  var mapCard = map.querySelector('.popup');
  var closePopup = map.querySelector('.popup__close');
  mapPinMain.addEventListener('mouseup', window.pin.onMapPinMain);
  closePopup.addEventListener('click', onClosePopup);
  closePopup.addEventListener('keydown', onClosePopup);
  document.addEventListener('keydown', onMapKeydown);
  mapPins.addEventListener('click', onMapPin, false);
  mapPins.addEventListener('keydown', onMapPin);
})();
