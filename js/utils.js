'use strict';

(function () {
  var timeOut;

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
    [].forEach.call(fieldArray, function (field) {
      field.setAttribute('disabled', true);
    });
  };

  var enableFields = function (fieldArray) {
    [].forEach.call(fieldArray, function (field) {
      field.removeAttribute('disabled', true);
    });
  };

  var syncValues = function (field, changeValue) {
    field.value = changeValue;
  };

  var syncValueToAttribute = function (field, changeValue, attribute) {
    field.setAttribute(attribute, changeValue);
  };

  var debounce = function (func, wait) {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(func, wait);
  };
  var removeAllChildNodes = function (parent) {
    parent.textContent = '';
  };

  var removeChildNodes = function (parent, childs) {
    var childNodes = parent.querySelectorAll(childs);
    var cloneParent = parent;
    [].forEach.call(childNodes, function (child) {
      cloneParent.removeChild(child);
    });
    parent = cloneParent;
  };

  var getCheckedChildNodes = function (parent) {
    return [].filter.call(parent, function (elem) {
      return elem.checked;
    });
  };

  window.utils = {
    errorMessage: errorMessage,
    disableFields: disableFields,
    enableFields: enableFields,
    syncValues: syncValues,
    syncValueToAttribute: syncValueToAttribute,
    debounce: debounce,
    removeAllChildNodes: removeAllChildNodes,
    removeChildNodes: removeChildNodes,
    getCheckedChildNodes: getCheckedChildNodes
  };
})();
