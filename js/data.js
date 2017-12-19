'use strict';

(function () {
  var MAX_PIN_COUNT = 5;
  var MIN_PIN_COUNT = 0;
  var ANY_VALUE = 'any';
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var mapFilter = window.selectors.map.querySelector('.map__filters');
  var house = mapFilter.querySelector('#housing-type');
  var price = mapFilter.querySelector('#housing-price');
  var rooms = mapFilter.querySelector('#housing-rooms');
  var guests = mapFilter.querySelector('#housing-guests');
  var features = mapFilter.querySelector('#housing-features').querySelectorAll('input');
  var activePin = null;
  var ads = [];
  var filteredAds = [];

  var setAds = function (newAds) {
    for (var i = 0; i < newAds.length; i++) {
      ads.push(newAds[i]);
    }
  };

  var isHouseEqual = function (ad) {
    return house.value === ad.offer.type || house.value === ANY_VALUE;
  };

  var isPriceEqual = function (ad) {
    var typePrice;
    if (ad.offer.price < LOW_PRICE) {
      typePrice = 'low';
    } else if (ad.offer.price >= LOW_PRICE && ad.offer.price < HIGH_PRICE) {
      typePrice = 'middle';
    } else {
      typePrice = 'high';
    }
    return price.value === typePrice || price.value === ANY_VALUE;
  };

  var isRoomsEqual = function (ad) {
    return rooms.value === ad.offer.rooms.toString() || rooms.value === ANY_VALUE;
  };

  var isGuestsEqual = function (ad) {
    return guests.value === ad.offer.guests.toString() || guests.value === ANY_VALUE;
  };

  var isFeaturesEqual = function (ad) {
    var checkedFeatures = [].filter.call(features, function(elem){
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
    filteredAds = ads.filter(filterElement).slice(MIN_PIN_COUNT, MAX_PIN_COUNT);
  };

  var getAd = function (num) {
    return filteredAds[num];
  };

  var getAdsCount = function () {
    return filteredAds.length;
  };

  window.data = {
    setAds: setAds,
    getAd: getAd,
    filterArray: filterArray,
    getAdsCount: getAdsCount,
    activePin: activePin
  };
})();
