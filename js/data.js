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

  var getAdCount = function () {
    return ads.length - 1;
  };
  
  window.data = {
    setAds: setAds,
    getAds: getAds,
    getAdCount: getAdCount,
    activePin: activePin
  };
})();
