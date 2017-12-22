'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var timeOut;

  var removeErrorMessage = function () {
    var node = document.querySelector('.error');
    document.body.removeChild(node);
  };

  var errorMessage = function (textError) {
    var node = document.createElement('div');
    node.style.border = '1px solid';
    node.style.textAlign = 'center';
    node.style.width = '50%';
    node.style.padding = '20';
    node.style.opacity = '0.8';
    node.style.zIndex = '100';
    node.style.position = 'fixed';
    node.style.color = '#D8000C';
    node.style.background = '#FFBABA';
    node.style.fontSize = '30px';
    node.textContent = textError;
    node.setAttribute('class', 'error');
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(removeErrorMessage, 5000);
  };

  var disableFields = function (fields) {
    [].forEach.call(fields, function (field) {
      field.setAttribute('disabled', true);
    });
  };

  var enableFields = function (fields) {
    [].forEach.call(fields, function (field) {
      field.removeAttribute('disabled', true);
    });
  };

  var syncValues = function (field, changeValue) {
    field.value = changeValue;
  };

  var syncValueToAttribute = function (field, changeValue, attribute) {
    field.setAttribute(attribute, changeValue);
  };

  var debounce = function (callback, wait) {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(callback, wait);
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
    return [].filter.call(parent, function (element) {
      return element.checked;
    });
  };

  var uploadImage = function (image, imageContainer) {
    var imageName = image.name.toLowerCase();

    var matches = FILE_TYPES.some(function (type) {
      return imageName.endsWith(type);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageContainer.setAttribute('src', reader.result);
      });

      reader.readAsDataURL(image);
    }
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
    uploadImage: uploadImage,
    getCheckedChildNodes: getCheckedChildNodes
  };
})();
