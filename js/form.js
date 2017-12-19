'use strict';

(function () {
  var TYPE_LIST = ['flat', 'bungalo', 'house', 'palace'];
  var PRICES_PER_NIGHT = ['1000', '0', '5000', '10000'];
  var TIME_LIST = ['12:00', '13:00', '14:00'];
  var ROOMS_NUMBERS = ['1', '2', '3', '100'];
  var GUESTS_NUMBERS = ['1', '2', '3', '0'];
  var MAX_ROOMS_NUMBER = 100;
  var MIN_GUESTS_NUMBER = '0';

  var noticeForm = document.querySelector('.notice__form');
  var selectTypeLodging = noticeForm.querySelector('#type');
  var inputPrice = noticeForm.querySelector('#price');
  var selectTimeIn = noticeForm.querySelector('#timein');
  var selectTimeOut = noticeForm.querySelector('#timeout');
  var selectRoomNumber = noticeForm.querySelector('#room_number');
  var selectGuestNumber = noticeForm.querySelector('#capacity');
  var optionsGuestNumber = selectGuestNumber.querySelectorAll('option');

  var getGuestsArray = function (num) {
    var guestOptions = [];
    if (num < MAX_ROOMS_NUMBER) {
      guestOptions = Array.from(optionsGuestNumber).filter(function (elem) {
        return elem.value <= num && elem.value !== MIN_GUESTS_NUMBER;
      });
    } else {
      guestOptions.push(optionsGuestNumber[3]);
    }
    return guestOptions;
  };

  var onSelectTypeLodging = function () {
    window.synchronizeFields(selectTypeLodging, inputPrice, TYPE_LIST, PRICES_PER_NIGHT, window.utils.syncValueToAttribute, 'min');
  };

  var onSelectTimeIn = function () {
    window.synchronizeFields(selectTimeIn, selectTimeOut, TIME_LIST, TIME_LIST, window.utils.syncValues);
  };

  var onSelectTimeOut = function () {
    window.synchronizeFields(selectTimeOut, selectTimeIn, TIME_LIST, TIME_LIST, window.utils.syncValues);
  };

  var onSelectRoomNumber = function (evt) {
    window.synchronizeFields(selectRoomNumber, selectGuestNumber, ROOMS_NUMBERS, GUESTS_NUMBERS, window.utils.syncValues);
    window.utils.disableFields(optionsGuestNumber);
    window.utils.enableFields(getGuestsArray(evt.target.value));
  };

  var onSubmit = function (evt) {
    var fData = new FormData(noticeForm);
    window.backend.save(fData, noticeForm.reset, window.utils.errorMessage);
    evt.preventDefault();
  };

  var renderForm = function () {
    window.utils.disableFields(optionsGuestNumber);
    window.utils.enableFields(getGuestsArray(1));
    selectTypeLodging.addEventListener('change', onSelectTypeLodging);
    selectTimeIn.addEventListener('change', onSelectTimeIn);
    selectTimeOut.addEventListener('change', onSelectTimeOut);
    selectRoomNumber.addEventListener('change', onSelectRoomNumber);
    noticeForm.addEventListener('submit', onSubmit);
  };

  window.form = {
    render: renderForm()
  };
})();
