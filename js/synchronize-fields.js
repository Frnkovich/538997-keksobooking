'use strict';

(function () {
  window.synchronizeFields = function (syncField, withField, syncArray, withArray, howSync, attribute) {
    var ind = syncArray.indexOf(syncField.value);
    howSync(withField, withArray[ind], attribute);
  };
})();
