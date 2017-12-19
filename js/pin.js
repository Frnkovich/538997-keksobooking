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
    mapElement.children[0].setAttribute('src', pin.author.avatar);
    mapElement.setAttribute('id', id);
    return mapElement;
  };

  var removeMapPins = function () {
    var mapPinAll = mapPins.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPinAll.length; i++) {
      mapPins.removeChild(mapPinAll[i]);
    }
  };

  var renderPins = function () {
    removeMapPins();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.getAdsCount(); i++) {
      fragment.appendChild(renderMapPin(window.data.getAd(i), i));
    }
    mapPins.appendChild(fragment);
  };

  var activateAll = function () {
    renderPins();
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    window.utils.enableFields(noticeFormFieldset);
  };

  window.pin = {
    render: renderPins,
    activateAll: activateAll
  };
})();
