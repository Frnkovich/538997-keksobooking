'use strict';

(function () {
  var MAP_PIN_WIDTH = 46;
  var MAP_PIN_HEIGHT = 64;

  var mapPin = window.selectors.mapTemplate.querySelector('.map__pin');
  var noticeFormFieldsets = window.selectors.noticeForm.querySelectorAll('fieldset');

  var renderMapPin = function (pin, id) {
    var locationX = pin.location.x - MAP_PIN_WIDTH / 2;
    var locationY = pin.location.y - MAP_PIN_HEIGHT;
    var mapElement = mapPin.cloneNode(true);
    mapElement.setAttribute('style', 'left:' + locationX + 'px; top:' + locationY + 'px;');
    mapElement.children[0].setAttribute('src', pin.author.avatar);
    mapElement.setAttribute('id', id);
    return mapElement;
  };

  var renderPins = function () {
    var mapPinAll = window.selectors.mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.utils.removeChildNodes(window.selectors.mapPins, mapPinAll);
    var adsCount = window.data.getAdsCount();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adsCount; i++) {
      fragment.appendChild(renderMapPin(window.data.getAd(i), i));
    }
    window.selectors.mapPins.appendChild(fragment);
  };

  var activateAll = function () {
    renderPins();
    window.selectors.map.classList.remove('map--faded');
    window.selectors.noticeForm.classList.remove('notice__form--disabled');
    window.utils.enableFields(noticeFormFieldsets);
  };

  window.pin = {
    render: renderPins,
    activateAll: activateAll
  };
})();
