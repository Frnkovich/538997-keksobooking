'use strict';

(function () {
  var MAP_PIN_WIDTH = 46;
  var MAP_PIN_HEIGHT = 64;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapTemplate = document.querySelector('template').content;
  var mapPin = mapTemplate.querySelector('.map__pin');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');

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
    for (var i = 0; i < window.data.getAdCount(); i++) {
      fragment.appendChild(renderMapPin(window.data.getAd(i), i));
    }
    mapPins.appendChild(fragment);
  };

  var onMainPinClick = function () {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    window.utils.enableFields(noticeFormFieldset);
    var mapPinAll = mapPins.querySelectorAll('.map__pin');
    showMapPins(mapPinAll);
  };

  window.pin = {
    renderPins: renderPins,
    onMainPinClick: onMainPinClick
  };
})();
