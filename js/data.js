'use strict';

(function () {
  var clickedElement = null;
  var ads = [];

  var getAds = function (newAds) {
    for (var i = 0; i <= newAds.length; i++) {
      ads.push(newAds[i]);
    }
  };

  var errorMessage = function (textError) {
    var node = document.createElement('div');
    node.style.border = '1px solid';
    node.style.textAlign = 'center';
    node.style.width = '100%';
    node.style.borderRadius = '5px'
    node.style.zIndex = '100'
    node.style.position = 'fixed';
    node.style.color = '#D8000C';
    node.style.background = '#FFBABA';
    node.style.fontSize = '30px';
    node.textContent = textError;
    document.body.insertAdjacentElement('beforeBegin', node);
  };

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
    ads: ads,
    getAds: getAds,
    errorMessage: errorMessage,
    disableFormFields: disableFormFields,
    enableFormFields: enableFormFields,
    clickedElement: clickedElement
  };
})();
