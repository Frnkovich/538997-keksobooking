'use strict';

(function () {
  var TYPE_LIST = ['flat', 'bungalo', 'house', 'palace'];
  var PRICES_PER_NIGHT = ['1000', '0', '5000', '10000'];
  var TIME_LIST = ['12:00', '13:00', '14:00'];
  var ROOMS_NUMBERS = ['1', '2', '3', '100'];
  var GUESTS_NUMBERS = ['1', '2', '3', '0'];
  var MAX_ROOMS_NUMBER = 100;
  var MIN_GUESTS_NUMBER = '0';

  var selectTypeLodging = window.selectors.noticeForm.querySelector('#type');
  var inputPrice = window.selectors.noticeForm.querySelector('#price');
  var selectTimeIn = window.selectors.noticeForm.querySelector('#timein');
  var selectTimeOut = window.selectors.noticeForm.querySelector('#timeout');
  var selectRoomNumber = window.selectors.noticeForm.querySelector('#room_number');
  var selectGuestNumber = window.selectors.noticeForm.querySelector('#capacity');
  var optionsGuestNumbers = selectGuestNumber.querySelectorAll('option');
  var noticeFormFieldsets = window.selectors.noticeForm.querySelectorAll('fieldset');

  var getGuestsArray = function (num) {
    var guestOptions = [];
    if (num < MAX_ROOMS_NUMBER) {
      guestOptions = [].filter.call(optionsGuestNumbers, function (element) {
        return element.value <= num && element.value !== MIN_GUESTS_NUMBER;
      });
    } else {
      guestOptions.push(optionsGuestNumbers[3]);
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
    window.utils.disableFields(optionsGuestNumbers);
    window.utils.enableFields(getGuestsArray(evt.target.value));
  };

  var onLoad = function () {
    window.selectors.noticeForm.reset();
    window.map.fillAddresField();
  };

  var onSubmit = function (evt) {
    var fData = new FormData(window.selectors.noticeForm);
    window.backend.save(fData, onLoad, window.utils.errorMessage);
    evt.preventDefault();
  };

  var renderForm = function () {
    window.utils.disableFields(noticeFormFieldsets);
    window.utils.disableFields(optionsGuestNumbers);
    window.utils.enableFields(getGuestsArray(1));
    selectTypeLodging.addEventListener('change', onSelectTypeLodging);
    selectTimeIn.addEventListener('change', onSelectTimeIn);
    selectTimeOut.addEventListener('change', onSelectTimeOut);
    selectRoomNumber.addEventListener('change', onSelectRoomNumber);
    window.selectors.noticeForm.addEventListener('submit', onSubmit);
  };

  window.form = {
    render: renderForm()
  };
})();
