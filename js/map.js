'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var mapPins = map.querySelector('.map__pins');
//var mapPin = mapPins.querySelector('.map__pin');
var mapTemplate = document.querySelector('template').content;
var mapCardElement = mapTemplate.cloneNode(true);
var mapTextElements = mapCardElement.querySelectorAll('p');
var mapPin = mapTemplate.querySelector('.map__pin');

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
var TYPE_LIST_RUS = ['Квартира', 'Дом', 'Бунгало'];
var TIME_LIST = ['12:00', '13:00', '14:00'];
var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MAP_PIN_WIDTH = 65;
var MAP_PIN_HEIGHT = 87;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 10;
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 200;
var MAX_Y = 500;
var titleList = TITLE_LIST.slice();
var ads = [];

var getRandom = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var compareRandom = function () {
  return Math.random() - 0.5;
}

var getRandomArray = function (array, index) {
  array.sort(compareRandom);
  var resultArray = [];
  for (var i = 0; i <= index; i++) {
    resultArray.push(array[i]);
  }
  return resultArray;
}

titleList = getRandomArray(titleList, 7);
var getAdData = function (authorNumber) {
  var x = getRandom(MIN_X, MAX_X);
  var y = getRandom(MIN_Y, MAX_Y);
  var ad = {
    author: {
      avatar: 'img/avatars/user0' + (authorNumber + 1) + '.png'
    },

    offer: {
      title: titleList[authorNumber],
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
      x: x - MAP_PIN_WIDTH / 2,
      y: y - MAP_PIN_HEIGHT
    }
  };
  authorNumber += 1;
  return ad;
};

var fillAdsData = function () {
  for (var i = 0; i <= 7; i++) {
    ads[i] = getAdData(i);
  }
  return ads;
};

var getMapPin = function (pin) {
  var mapElement = mapPin.cloneNode(true);
  mapElement.setAttribute('style', 'left:' + pin.location.x + 'px; top:' + pin.location.y + 'px');
  mapElement.children[0].setAttribute('src', pin.author.avatar);
  return mapElement;
};

var renderMapPin = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(getMapPin(ads[i]));
  }
  mapPins.appendChild(fragment);
};

var getFeaturesList = function (features) {
  var ulElement = mapCardElement.querySelector('.popup__features');
  var liFragment = document.createDocumentFragment();
  for (var i = 0; i <= features.length - 1; i++) {
    var newElement = document.createElement('li');
    newElement.className = 'feature feature--' + features[i];
    liFragment.appendChild(newElement);
  }
  ulElement.appendChild(liFragment);
};

var getMapCard = function (ad) {
  mapCardElement.querySelector('.popup__avatar').setAttribute('src', ad.author.avatar);
  mapCardElement.querySelector('h3').textContent = ad.offer.title;
  mapTextElements[0].textContent = ad.offer.address;
  mapCardElement.querySelector('.popup__price').textContent = ad.offer.price + '/ночь';
  mapCardElement.querySelector('h4').textContent = TYPE_LIST_RUS[TYPE_LIST_ENG.indexOf(ad.offer.type)];
  mapTextElements[2].textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  mapTextElements[3].textContent = 'Заезд после ' + ad.offer.checkin + ' , выезд до ' + ad.offer.checkout;
  getFeaturesList(ad.offer.features);
  mapTextElements[4].textContent = ad.offer.description;
  map.appendChild(mapCardElement);
};

fillAdsData();
renderMapPin();
getMapCard(ads[0]);
