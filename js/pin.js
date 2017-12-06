'use strict';

(function () {
  var MAP_PIN_WIDTH = 46;
  var MAP_PIN_HEIGHT = 64;
  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_HEIGHT = 87;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapTemplate = document.querySelector('template').content;
  var mapPin = mapTemplate.querySelector('.map__pin');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
  var inputAddress = noticeForm.querySelector('#address');

  var renderMapPin = function (pin, id) {
    var locationX = pin.location.x - MAP_PIN_WIDTH / 2;
    var locationY = pin.location.y - MAP_PIN_HEIGHT;
    var mapElement = mapPin.cloneNode(true);
    mapElement.setAttribute('style', 'left:' + locationX + 'px; top:' + locationY + 'px;');
    mapElement.setAttribute('hidden', '');
    mapElement.children[0].setAttribute('src', pin.author.avatar);
    mapElement.setAttribute('id', id);
    return mapElement;
  };

  var showMapPins = function (mapPinArray) {
    for (var i = 0; i < mapPinArray.length; i++) {
      mapPinArray[i].removeAttribute('hidden');
    }
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.getAds.length; i++) {
      fragment.appendChild(renderMapPin(window.data.getAds[i], i));
    }
    mapPins.appendChild(fragment);
  };

  var onMainPinClick = function (evt) {
    var pinClicked = evt.target.classList.contains('map__pin--main');
    var clickedMapPinMain = pinClicked ? evt.target : evt.target.parentElement;
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    window.data.enableFormFields(noticeFormFieldset);
    var mapPinAll = mapPins.querySelectorAll('.map__pin');
    showMapPins(mapPinAll);
    var y = clickedMapPinMain.offsetTop + MAP_PIN_MAIN_HEIGHT;
    var x = clickedMapPinMain.offsetLeft + MAP_PIN_MAIN_WIDTH / 2;
    inputAddress.value = x + ', ' + y;
  };

  window.pin = {
    renderPins: renderPins,
    onMainPinClick: onMainPinClick
  };
})();
