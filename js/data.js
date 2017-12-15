'use strict';

(function () {
  var activePin = null;
  var ads = [];
  var arrayAds = [];
  var MAX_PIN_COUNT = 5;
  var MIN_PIN_COUNT = 0;
  var map = document.querySelector('.map');
  var mapFilter = map.querySelector('.map__filters');
  var house = mapFilter.querySelector('#housing-type');
  var price = mapFilter.querySelector('#housing-price');
  var rooms = mapFilter.querySelector('#housing-rooms');
  var guests = mapFilter.querySelector('#housing-guests');
  var features = mapFilter.querySelector('#housing-features').querySelectorAll('input');

  var setAds = function (newAds) {
    for (var i = 0; i < newAds.length; i++) {
      ads.push(newAds[i]);
    }
  };

  var isHouseEqual = function (ad) {
    return (house.value === ad.offer.type || house.value === 'any');
  };

  var isPriceEqual = function (ad) {
    var typePrice;
    if (ad.offer.price < 10000) {
      typePrice = 'low';
    } else if (ad.offer.price >= 10000 && ad.offer.price < 50000) {
      typePrice = 'middle';
    } else {
      typePrice = 'high';
    }
    return (price.value === typePrice || price.value === 'any');
  };

  var isRoomsEqual = function (ad) {
    return (rooms.value === ad.offer.rooms.toString() || rooms.value === 'any');
  };

  var isGuestsEqual = function (ad) {
    return (guests.value === ad.offer.guests.toString() || guests.value === 'any');
  };

  var isFeaturesEqual = function (ad) {
    var checkedFeatures = Array.from(features).filter(function (elem) {
      return elem.checked === true;
    });

    if (!(checkedFeatures.length)) {
      return true;
    }

    for (var i = 0; i < checkedFeatures.length; i++) {
      if (!(ad.offer.features.includes(checkedFeatures[i].value))) {
        return false;
      }
    }
    return true;
  };

  var filterElement = function (ad) {
    return isHouseEqual(ad) && isPriceEqual(ad) && isRoomsEqual(ad) && isGuestsEqual(ad) && isFeaturesEqual(ad);
  };

  var filterArray = function () {
    arrayAds = ads.filter(filterElement).slice(MIN_PIN_COUNT, MAX_PIN_COUNT);
  };

  var getAd = function (num) {
    return arrayAds[num];
  };

  var getAdsCount = function () {
    var adsLength = arrayAds.length;
    return adsLength;
  };

  window.data = {
    setAds: setAds,
    getAd: getAd,
    filterArray: filterArray,
    getAdsCount: getAdsCount,
    activePin: activePin
  };
})();
