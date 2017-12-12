'use strict';

(function () {
  var errorMessage = function (textError) {
    var node = document.createElement('div');
    node.style.border = '1px solid';
    node.style.textAlign = 'center';
    node.style.width = '100%';
    node.style.borderRadius = '5px';
    node.style.zIndex = '100';
    node.style.position = 'fixed';
    node.style.color = '#D8000C';
    node.style.background = '#FFBABA';
    node.style.fontSize = '30px';
    node.textContent = textError;
    document.body.insertAdjacentElement('beforeBegin', node);
  };

  var disableFields = function (fieldArray) {
    for (var i = 0; i < fieldArray.length; i++) {
      fieldArray[i].setAttribute('disabled', true);
    }
  };

  var enableFields = function (fieldArray) {
    for (var i = 0; i < fieldArray.length; i++) {
      fieldArray[i].removeAttribute('disabled');
    }
  };

  window.utils = {
    errorMessage: errorMessage,
    disableFields: disableFields,
    enableFields: enableFields
  };
})();
