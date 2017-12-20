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
  var DELAY = 500;

  var mapPinMain = window.selectors.map.querySelector('.map__pin--main');
  var inputAddress = window.selectors.noticeForm.querySelector('#address');
  var mapCard = window.selectors.map.querySelector('.popup');
  var mapFilter = window.selectors.map.querySelector('.map__filters');
  var closePopup;

  var hideAd = function () {
    if (mapCard) {
      mapCard.setAttribute('hidden', '');
      if (window.data.activePin) {
        window.data.activePin.classList.remove('map__pin--active');
      }
    }
  };

  var isMapPin = function (classList) {
    return classList.contains('map__pin') && !classList.contains('map__pin--main');
  };

  var removePopupHandler = function () {
    closePopup.removeEventListener('click', onClosePopup);
    closePopup.removeEventListener('keydown', onClosePopup);
    document.removeEventListener('keydown', onMapKeydown);
  };

  var onMapPin = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
      if (evt.target !== evt.currentTarget) {
        var pinClicked = isMapPin(evt.target.classList);
        var imageClicked = isMapPin(evt.target.parentElement.classList);
        if (pinClicked || imageClicked) {
          var clickedPin = pinClicked ? evt.target : evt.target.parentElement;
          window.showCard(clickedPin);
          mapCard = window.selectors.map.querySelector('.popup');
          closePopup = window.selectors.map.querySelector('.popup__close');
          mapCard.removeAttribute('hidden');
          closePopup.addEventListener('click', onClosePopup);
          closePopup.addEventListener('keydown', onClosePopup);
          document.addEventListener('keydown', onMapKeydown);
        }
      }
      evt.stopPropagation();
    }
  };

  var onClosePopup = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.type === 'click') {
      hideAd();
      removePopupHandler();
    }
  };

  var onMapKeydown = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      hideAd();
      removePopupHandler();
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
      var x = mapPinMain.offsetLeft + MAP_PIN_MAIN_WIDTH / 2;
      var y = mapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT;
      inputAddress.value = 'x: ' + x + ', y: ' + y;
      window.pin.activateAll();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onFilterChange = function () {
    hideAd();
    window.data.filterArray();
    window.pin.render();
  };

  var initializationMap = function () {
    window.data.filterArray();
    mapPinMain.addEventListener('mousedown', onMainPin);
    window.selectors.mapPins.addEventListener('click', onMapPin);
    window.selectors.mapPins.addEventListener('keydown', onMapPin);
    mapFilter.addEventListener('change', function () {
      window.utils.debounce(onFilterChange, DELAY);
    });
  };

  window.map = {
    initialization: initializationMap
  };
})();
