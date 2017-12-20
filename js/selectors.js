'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapTemplate = document.querySelector('template').content;
  var noticeForm = document.querySelector('.notice__form');
  noticeForm.reset = noticeForm.reset.bind(noticeForm);

  window.selectors = {
    map: map,
    mapTemplate: mapTemplate,
    mapPins: mapPins,
    noticeForm: noticeForm
  };
})();
