'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 87;
  var MIN_X = 50;
  var MAX_X = 1150;
  var MIN_Y = 150;
  var MAX_Y = 650;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
  var mapPins = map.querySelector('.map__pins');
  var inputAddress = noticeForm.querySelector('#address');
  var mapCard = map.querySelector('.popup');
  var closePopup;

  var hideAd = function () {
    mapCard.setAttribute('hidden', '');
    if (window.data.clickedElement) {
      window.data.clickedElement.classList.remove('map__pin--active');
    }
  };

  var isMapPin = function (classList) {
    return classList.contains('map__pin') && !classList.contains('map__pin--main');
  };

  var onMapPin = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
      if (evt.target !== evt.currentTarget) {
        var pinClicked = isMapPin(evt.target.classList);
        var imageClicked = isMapPin(evt.target.parentElement .classList);
        if (pinClicked || imageClicked) {
          var clickedPin = pinClicked ? evt.target : evt.target.parentElement;
          window.showCard(clickedPin);
          mapCard = map.querySelector('.popup');
          closePopup = map.querySelector('.popup__close');
          mapCard.removeAttribute('hidden');
          closePopup.addEventListener('click', onClosePopup);
          closePopup.addEventListener('keydown', onClosePopup);
        }
      }
      evt.stopPropagation();
    }
  };

  var onClosePopup = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
      hideAd();
    }
  };

  var onMapKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideAd();
    }
  };

  var onMainPin = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newY = mapPinMain.offsetTop - shift.y;
      var newX = mapPinMain.offsetLeft - shift.x;

      if ((newY <= MAX_Y) && (newY >= MIN_Y)) {
        mapPinMain.style.top = newY + 'px';
      }
      if ((newX <= MAX_X) && (newX >= MIN_X)) {
        mapPinMain.style.left = newX + 'px';
      }
      var inputX = newX + MAP_PIN_MAIN_WIDTH / 2;
      var inputY = newY + MAP_PIN_MAIN_HEIGHT;
      inputAddress.value = 'x: ' + inputX + ', y: ' + inputY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.pin.onMainPinClick(upEvt);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.data.disableFormFields(noticeFormFieldset);
  var renderMap = function () {
    window.pin.renderPins(window.data.ads);
    mapPinMain.addEventListener('mousedown', onMainPin);
    document.addEventListener('keydown', onMapKeydown);
    mapPins.addEventListener('click', onMapPin);
    mapPins.addEventListener('keydown', onMapPin);
  };

  window.map = {
    renderMap: renderMap
  };
})();
