'use strict';

(function () {
  var activePin = null;
  var ads = [];

  var setAds = function (newAds) {
    for (var i = 0; i <= newAds.length; i++) {
      ads.push(newAds[i]);
    }
  };

  var getAds = function () {
    return ads;
  };

  window.data = {
    setAds: setAds,
    getAds: getAds,
    activePin: activePin
  };
})();
