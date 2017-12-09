'use strict';

(function () {
  window.synchronizeFields = function (syncField, withField, syncArray, withArray, howSync) {
    var ind = syncArray.indexOf(syncField.value);
    howSync(withField, withArray[ind]);
  };
})();
