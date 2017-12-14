'use strict';

(function () {
  var MAP_PIN_WIDTH = 46;
  var MAP_PIN_HEIGHT = 64;
  var MAX_PIN_NUMBER = 5;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapTemplate = document.querySelector('template').content;
  var mapPin = mapTemplate.querySelector('.map__pin');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');
  var arr;
  var mapFilter = map.querySelector('.map__filters');

  var isHouseEqual = function (ad) {
    var house = mapFilter.querySelector('#housing-type');
    return  (house.value === ad.offer.type || house.value === 'any') ? true : false;
  };

  var isPriceEqual = function (ad) {
    var price = mapFilter.querySelector('#housing-price');
    var typePrice;
    if (ad.offer.price < 10000) {
      typePrice = 'low';
    } else if (ad.offer.price >= 10000 && ad.offer.price < 50000) {
      typePrice = 'middle';
    } else {
      typePrice = 'high';
    }
    return  (price.value === typePrice || price.value === 'any') ? true : false;
  };

  var isRoomsEqual = function (ad) {
    var rooms = mapFilter.querySelector('#housing-rooms');
    return  (rooms.value <= ad.offer.rooms || rooms.value === 'any') ? true : false;
  };

  var isGuestsEqual = function (ad) {
    var guests = mapFilter.querySelector('#housing-guests');
    return  (guests.value <= ad.offer.guests || guests.value === 'any') ? true : false;
  };

  var isFeaturesEqual = function (ad) {
    var features = mapFilter.querySelector('#housing-features').querySelectorAll('input');
    var checkedFeatures = [].filter.call(features, (function (elem) {
       return elem.checked === true;
    }));

    if (!(checkedFeatures.length)) {
      return true;
    };

    for (var i = 0; i < checkedFeatures.length; i++){
      if (ad.offer.features.indexOf(checkedFeatures[i].value) < 0) {
        return false;
      }
    };

    return true;
  };

  var filterAll = function (ad, i) {
    if (i == 10) return false;
    return (isHouseEqual(ad) && isPriceEqual(ad) && isRoomsEqual(ad) && isGuestsEqual(ad) && isFeaturesEqual(ad)) ? true : false;
  };

  var filterArr = function () {
    var arr = window.data.getAds();
    return arr.filter(filterAll);
  };

  var getAd = function (num) {
    return arr[num];
  };

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
    var mapPins = map.querySelector('.map__pins');
    var mapPin = mapPins.querySelectorAll('.map__pin');
    for (var i = 1; i < mapPin.length; i++) {
      mapPins.removeChild(mapPin[i]);
    }
    arr = filterArr();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(arr.length, MAX_PIN_NUMBER); i++) {
      fragment.appendChild(renderMapPin(arr[i], i));
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
    onMainPinClick: onMainPinClick,
    getAd: getAd,
    showMapPins: showMapPins
  };
})();
