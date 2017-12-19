'use strict';

(function () {
  var TYPE_LIST_RUS = ['Квартира', 'Дом', 'Бунгало'];
  var TYPE_LIST_ENG = ['flat', 'house', 'bungalo'];

  var mapPopup = window.selectors.mapTemplate.querySelector('.popup');
  var mapCardElement = mapPopup.cloneNode(true);
  var mapTextElements = mapCardElement.querySelectorAll('p');
  var cardFeatures = mapCardElement.querySelector('.popup__features');

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
    var oneGuest = 1;
    if (guestsNumber === oneGuest) {
      return 'гостя';
    } else {
      return 'гостей';
    }
  };

  var renderFeaturesList = function (features) {
    var liElements = cardFeatures.querySelectorAll('.feature');
    liElements.forEach(function (liElement) {
      cardFeatures.removeChild(liElement);
    })
    var liFragment = document.createDocumentFragment();
    var newElement;
    features.forEach(function (feature) {
      newElement = document.createElement('li');
      newElement.className = 'feature feature--' + feature;
      liFragment.appendChild(newElement);
    })
    cardFeatures.appendChild(liFragment);
  };

  var renderAd = function (ad) {
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
    window.selectors.map.insertBefore(mapCardElement, window.selectors.map.querySelector('.map__filters-container'));
  };

  window.card = {
    renderAd: renderAd
  };
})();
