'use strict';

(function () {
  var TYPE_LIST_RUS = ['Квартира', 'Дом', 'Бунгало'];
  var TYPE_LIST_ENG = ['flat', 'house', 'bungalo'];
  var ONE_VALUE = 1;
  var FIVE_VALUE = 5;

  var mapPopup = window.selectors.mapTemplate.querySelector('.popup');
  var mapCardElement = mapPopup.cloneNode(true);
  var mapTextElements = mapCardElement.querySelectorAll('p');
  var cardFeatures = mapCardElement.querySelector('.popup__features');

  var getRoomWord = function (roomsNumber) {
    if (roomsNumber === ONE_VALUE) {
      return 'комната';
    } else if (roomsNumber > ONE_VALUE && roomsNumber < FIVE_VALUE) {
      return 'комнаты';
    }
    return 'комнат';
  };

  var getGuestWord = function (guestsNumber) {
    return guestsNumber === ONE_VALUE ? 'гостя' : 'гостей';
  };

  var renderFeaturesList = function (features) {
    var liElements = cardFeatures.querySelectorAll('.feature');
    window.utils.removeChildNodes(cardFeatures, liElements);
    var liFragment = document.createDocumentFragment();
    var newElement;
    [].forEach.call(features, function (feature) {
      newElement = document.createElement('li');
      newElement.className = 'feature feature--' + feature;
      liFragment.appendChild(newElement);
    });
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
