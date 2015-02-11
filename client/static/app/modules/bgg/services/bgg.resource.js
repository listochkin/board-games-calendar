define(function (require) {
  'use strict';
  require('xml2json');
  var x2js = new X2JS();

  BGGResourceService.$inject = ['BGG_CONFIG', '$http', '$q'];
  return BGGResourceService;

  function BGGResourceService(BGG_CONFIG, $http, $q) {
    return BGGResourceFactory;
    function BGGResourceFactory(type) {

      var url = BGG_CONFIG.proxyUrl + '/' + BGG_CONFIG.baseUrl + '/' + BGG_CONFIG.version + '/' + type;
      var defaultConfig = {
        transformResponse: function (data) {
          return x2js.xml_str2json(data);

        }
      };

      var thenFactoryMethod = function (httpPromise, successcb, errorcb, isArray) {
        var scb = successcb || angular.noop;
        var ecb = errorcb || angular.noop;

        return httpPromise.then(function (response) {
          var result;
          if (isArray) {
            result = [];
            for (var i = 0; i < response.data.boardgames.boardgame.length; i++) {
              result.push(new Resource(response.data.boardgames.boardgame[i]));
            }
          } else {
            if (response.data.boardgames.boardgame.error) {
              return $q.reject({
                code: 'boardgame.notfound',
                type: type
              });
            } else {
              result = new Resource(response.data.boardgames.boardgame);
            }
          }
          scb(result, response.status, response.headers, response.config);
          return result;
        }, function (response) {
          ecb(undefined, response.status, response.headers, response.config);
          return undefined;
        });
      };

      var Resource = function (data) {
        angular.extend(this, data);
      };

      Resource.query = function (queryJson, successcb, errorcb) {
        var params = angular.isObject(queryJson) ? JSON.stringify(queryJson) : {};
        angular.extend({}, defaultConfig.params, params);
        var httpPromise = $http.get(url, defaultConfig);
        return thenFactoryMethod(httpPromise, successcb, errorcb, true);
      };

      Resource.getById = function (id, queryJson, successcb, errorcb) {
        var params = angular.isObject(queryJson) ? JSON.stringify(queryJson) : {};
        angular.extend({}, defaultConfig.params, params);
        var httpPromise = $http.get(url + '/' + id, defaultConfig);
        return thenFactoryMethod(httpPromise, successcb, errorcb);
      };

      return Resource;
    }
  }
});

