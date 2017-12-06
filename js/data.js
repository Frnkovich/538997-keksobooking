'use strict';

(function () {
  var TITLE_LIST = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var TYPE_LIST_ENG = ['flat', 'house', 'bungalo'];
  var TIME_LIST = ['12:00', '13:00', '14:00'];
  var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 200;
  var MAX_Y = 500;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 5;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 10;
  var ADS_COUNT = 8;

  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var compareRandom = function () {
    return Math.random() - 0.5;
  };

  var getRandomArray = function (array, index) {
    var cloneArray = array.slice().sort(compareRandom);
    var resultArray = [];
    for (var i = 0; i <= index; i++) {
      resultArray.push(cloneArray[i]);
    }
    return resultArray;
  };

  var getAdData = function (authorNumber, title) {
    var x = getRandom(MIN_X, MAX_X);
    var y = getRandom(MIN_Y, MAX_Y);
    var ad = {
      author: {
        avatar: 'img/avatars/user0' + (authorNumber + 1) + '.png'
      },

      offer: {
        title: title[authorNumber],
        address: x + ', ' + y,
        price: getRandom(MIN_PRICE, MAX_PRICE),
        type: TYPE_LIST_ENG[getRandom(0, 2)],
        rooms: getRandom(MIN_ROOMS, MAX_ROOMS),
        guests: getRandom(MIN_GUESTS, MAX_GUESTS),
        checkin: TIME_LIST[getRandom(0, 2)],
        checkout: TIME_LIST[getRandom(0, 2)],
        features: getRandomArray(FEATURES_LIST, getRandom(0, 5)),
        description: '',
        photos: []
      },

      location: {
        x: x,
        y: y
      }
    };
    return ad;
  };

  var getAds = (function () {
    var ads = [];
    var title = getRandomArray(TITLE_LIST, TITLE_LIST.length);
    for (var i = 0; i < ADS_COUNT; i++) {
      ads.push(getAdData(i, title));
    }
    return ads;
  })();

  var disableFormFields = function (fieldArray) {
    for (var i = 0; i < fieldArray.length; i++) {
      fieldArray[i].setAttribute('disabled', true);
    }
  };

  var enableFormFields = function (fieldArray) {
    for (var i = 0; i < fieldArray.length; i++) {
      fieldArray[i].removeAttribute('disabled');
    }
  };

  window.data = {
    getAds: getAds,
    disableFormFields: disableFormFields,
    enableFormFields: enableFormFields
  };
})();
