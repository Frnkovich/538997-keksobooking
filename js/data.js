'use strict';

(function () {
  var activePin  = null;
  var ads = [];
  var adNum = 0;

  var setAds = function (newAds) {
    for (var i = 0; i <= newAds.length; i++) {
      ads.push(newAds[i]);
    }
  };

  var getAd = function (num) {
    return ads[num];
  };

  var getAdCount = function () {
    return ads.length - 1;
  };

  window.data = {
    setAds: setAds,
    getAdCount: getAdCount,
    getAd: getAd,
    activePin : activePin
  };
})();
