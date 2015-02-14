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
        transformResponse: transformResponse,
        params: {}
      };

      function transformResponse(data) {
        return x2js.xml_str2json(data);
      }

      function thenFactoryMethod(httpPromise, successcb, errorcb, isArray) {
        var scb = successcb || angular.noop;
        var ecb = errorcb || angular.noop;

        return httpPromise.then(function (response) {

          if (!response.data.boardgames.boardgame) {
            ecb(undefined, response.status, response.headers, response.config);
            return undefined;
          }

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
      }

      var Resource = function (data) {
        angular.extend(this, data);
      };

      Resource.query = function (queryJson, successcb, errorcb) {
        defaultConfig.params = angular.extend(defaultConfig.params, queryJson);
        var httpPromise = $http.get(url, defaultConfig);
        return thenFactoryMethod(httpPromise, successcb, errorcb, true);
      };

      Resource.getById = function (id, queryJson, successcb, errorcb) {
        defaultConfig.params = angular.extend(defaultConfig.params, queryJson);
        var httpPromise = $http.get(url + '/' + id, defaultConfig);
        return thenFactoryMethod(httpPromise, successcb, errorcb);
      };

      Resource.prototype.$id = function () {
        if (this._objectid) {
          return this._objectid;
        }
      };

      return Resource;
    }
  }
});

