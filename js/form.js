'use strict';

(function () {
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
    if (num) {
      for (var i = 0; i < optionsGuestNumber.length - 1; i++) {
        if (optionsGuestNumber[i].value <= num) {
          guestOptions.push(optionsGuestNumber[i]);
        }
      }
    } else {
      guestOptions.push(optionsGuestNumber[3]);
    }
    return guestOptions;
  };

  var setFieldValue = function (field, changeValue) {
    field.value = changeValue;
  };

  var onSelectTypeLodging = function (evt) {
    switch (evt.target.value) {
      case 'bungalo':
        inputPrice.min = '0';
        break;
      case 'flat':
        inputPrice.min = '1000';
        break;
      case 'house':
        inputPrice.min = '5000';
        break;
      default:
        inputPrice.min = '10000';
        break;
    }
  };

  var onSelectTimeIn = function (evt) {
    setFieldValue(selectTimeOut, evt.target.value);
  };

  var onSelectTimeOut = function (evt) {
    setFieldValue(selectTimeIn, evt.target.value);
  };

  var onSelectRoomNumber = function (evt) {
    var guestValue = evt.target.value < 100 ? evt.target.value : 0;
    setFieldValue(selectGuestNumber, guestValue);
    window.data.disableFormFields(optionsGuestNumber);
    window.data.enableFormFields(getGuestsArray(guestValue));
  };

  var renderForm = (function () {
    window.data.disableFormFields(optionsGuestNumber);
    window.data.enableFormFields(getGuestsArray(1));
    selectTypeLodging.addEventListener('change', onSelectTypeLodging);
    selectTimeIn.addEventListener('change', onSelectTimeIn);
    selectTimeOut.addEventListener('change', onSelectTimeOut);
    selectRoomNumber.addEventListener('change', onSelectRoomNumber);
  })();

  window.form = {
    renderForm: renderForm
  };
})();