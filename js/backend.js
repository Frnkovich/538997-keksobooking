'use strict';

(function () {
  var SERVER_URL = 'https://1510.dump.academy/keksobooking';

  var setup = function (onLoad, onError, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
        if (typeof callback === 'function') {
          callback();
        }
      } else if (xhr.status === 400) {
        onError(xhr.response[0].fieldName + ' ' + xhr.response[0].errorMessage);
      } else {
        onError(xhr.response[0].errorMessage);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var save = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', SERVER_URL);
    xhr.send(data);
  };

  var load = function (onLoad, onError, callback) {
    var xhr = setup(onLoad, onError, callback);
    xhr.open('GET', SERVER_URL + '/data');
    xhr.send();
  };

  window.backend = {
    save: save,
    load: load
  };
})();
