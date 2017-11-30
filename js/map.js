'use strict';

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mapTemplate = document.querySelector('template').content;
var mapPopup = mapTemplate.querySelector('.popup');
var mapCardElement = mapPopup.cloneNode(true);
var mapTextElements = mapCardElement.querySelectorAll('p');
var mapPin = mapTemplate.querySelector('.map__pin');
var mapPinMain = map.querySelector('.map__pin--main');
var noticeForm = document.querySelector('.notice__form');
var noticeFormFieldset = noticeForm.querySelectorAll('fieldset');

var mapPinAll;
var closePopup;
var mapCard;

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
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
var MAP_PIN_WIDTH = 46;
var MAP_PIN_HEIGHT = 64;
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
var ADS_COUNT = 8;
var clickedElement = null;
var ads = [];

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

var fillAdsData = function () {
  var title = getRandomArray(TITLE_LIST, TITLE_LIST.length);
  for (var i = 0; i < ADS_COUNT; i++) {
    ads.push(getAdData(i, title));
  }
  return ads;
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

var renderPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderMapPin(ads[i], i));
  }
  mapPins.appendChild(fragment);
};

var getRoomWord = function (roomsNumber) {
  var oneRoom = 1;
  var fiveRooms = 5;
  if (roomsNumber === oneRoom) {
    return 'комната';
  } else if (roomsNumber > oneRoom && roomsNumber < fiveRooms) {
    return 'комнаты';
  } else {
    return 'комнат';
  }
};

var getGuestWord = function (guestsNumber) {
  if (guestsNumber === MIN_GUESTS) {
    return 'гостя';
  } else {
    return 'гостей';
  }
};

var renderFeaturesList = function (features) {
  var ulElement = mapCardElement.querySelector('.popup__features');
  var liElement = ulElement.querySelectorAll('.feature');
  for (var i = 0; i < liElement.length; i++) {
    ulElement.removeChild(liElement[i]);
  }
  var liFragment = document.createDocumentFragment();
  var newElement;
  for (i = 0; i <= features.length - 1; i++) {
    newElement = document.createElement('li');
    newElement.className = 'feature feature--' + features[i];
    liFragment.appendChild(newElement);
  }
  ulElement.appendChild(liFragment);
};

var renderMapCard = function (ad) {
  mapCardElement.querySelector('.popup__avatar').setAttribute('src', ad.author.avatar);
  mapCardElement.querySelector('h3').textContent = ad.offer.title;
  mapTextElements[0].textContent = ad.offer.address;
  mapCardElement.querySelector('.popup__price').textContent = ad.offer.price + '/ночь';
  mapCardElement.querySelector('h4').textContent = TYPE_LIST_RUS[TYPE_LIST_ENG.indexOf(ad.offer.type)];
  mapTextElements[2].textContent = ad.offer.rooms + ' ' + getRoomWord(ad.offer.rooms) + ' для ' + ad.offer.guests + ' ' + getGuestWord(ad.offer.guests);
  mapTextElements[3].textContent = 'Заезд после ' + ad.offer.checkin + ' , выезд до ' + ad.offer.checkout;
  renderFeaturesList(ad.offer.features);
  mapTextElements[4].textContent = ad.offer.description;
  mapCardElement.setAttribute('hidden', '');
  map.insertBefore(mapCardElement, map.querySelector('.map__filters-container'));
};

var disabledFieldsets = function (fieldsetArray) {
  for (var i = 0; i < noticeFormFieldset.length; i++) {
    fieldsetArray[i].setAttribute('disabled', true);
  }
};

var showMapPins = function (mapPinArray) {
  for (var i = 0; i < mapPinArray.length; i++) {
    mapPinArray[i].removeAttribute('hidden');
  }
};

var unabledFieldsets = function (fieldsetArray) {
  for (var i = 0; i < noticeFormFieldset.length; i++) {
    fieldsetArray[i].removeAttribute('disabled');
  }
};

var onMapPinMain = function () {
  map.classList.remove('map--faded');
  unabledFieldsets(noticeFormFieldset);
  showMapPins(mapPinAll);
};

var onMapPinClick = function (evt) {
  if (clickedElement) {
    clickedElement.classList.remove('map__pin--active');
  }
  clickedElement = evt.currentTarget;
  clickedElement.classList.add('map__pin--active');
  renderMapCard(ads[clickedElement.id]);
  mapCard = map.querySelector('.popup');
  mapCard.removeAttribute('hidden');
};

var onMapPinKeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    if (clickedElement) {
      clickedElement.classList.remove('map__pin--active');
    }
    clickedElement = evt.currentTarget;
    clickedElement.classList.add('map__pin--active');
    renderMapCard(ads[clickedElement.id]);
    mapCard = map.querySelector('.popup');
    mapCard.removeAttribute('hidden');
  }
};


var onClosePopupClick = function () {
  mapCard.setAttribute('hidden', '');
  if (clickedElement) {
    clickedElement.classList.remove('map__pin--active');
  }
};

var onClosePopupKeydown = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    mapCard.setAttribute('hidden', '');
    if (clickedElement) {
      clickedElement.classList.remove('map__pin--active');
    }
  }
};

var onMapKeydown = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    mapCard.setAttribute('hidden', '');
    if (clickedElement) {
      clickedElement.classList.remove('map__pin--active');
    }
  }
};

var handleAllMapPin = function () {
  for (var i = 1; i < mapPinAll.length; i++) {
    mapPinAll[i].addEventListener('click', onMapPinClick, true);
    mapPinAll[i].addEventListener('keydown', onMapPinKeydown, true);
  }
};

var renderAll = function () {
  ads = fillAdsData();
  renderPins(ads);
  disabledFieldsets(noticeFormFieldset);

  renderMapCard(ads[0]);
  mapCard = map.querySelector('.popup');
  closePopup = map.querySelector('.popup__close');
  mapPinAll = mapPins.querySelectorAll('.map__pin');
};

renderAll();
mapPinMain.addEventListener('mouseup', onMapPinMain);
closePopup.addEventListener('click', onClosePopupClick);
closePopup.addEventListener('keydown', onClosePopupKeydown);
map.addEventListener('keydown', onMapKeydown);
handleAllMapPin();
