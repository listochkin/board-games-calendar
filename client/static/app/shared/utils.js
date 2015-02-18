define(function () {
    'use strict';

    var angular = require('angular'),
        module = angular.module('UtilsModule', []);

    module.factory('UtilsService', UtilsService);
    module.filter('cutText', cutText);
    module.filter('slice', slice);
    module.directive('showMore', ShowMore);

    UtilsService.$inject = ['$timeout', '$location'];
    ShowMore.$inject = ['$compile'];


  return module;

    function UtilsService($timeout, $location) {
        return {
            digestWrapper: digestWrapper,
            redirect: redirect,
            cutText: cutText
        };
        function redirect(url) {
            url = url || '/calendar';
            $location.path(url);
        }

        function digestWrapper(functionToWrap) {
            return wrapper;
            function wrapper() {
                var args = arguments;
                $timeout(function () {
                    functionToWrap.apply(functionToWrap, args);
                });
            }
        }
    }

    function cutText() {
        return function (value, max, tail, wordwise) {
            if (!value) {
                return '';
            }

            max = parseInt(max, 10);
            if (!max) {
                return value;
            }
            if (value.length <= max) {
                return value;
            }

            value = value.substr(0, max);
            //wordwise (boolean) - if true, cut only by words bounds
            if (wordwise) {
                var lastSpace = value.lastIndexOf(' ');
                if (lastSpace != -1) {
                    value = value.substr(0, lastSpace);
                }
            }

            return value + (tail || '…');
        };
    }

    function slice() {
      return function (inputArray, selectedPage, pageSize) {
        if (inputArray) {
          var start = (selectedPage - 1) * pageSize;
          return inputArray.slice(start, start + pageSize);
        }
      };
    }

    function ShowMore($compile) {
      return {
        restrict: 'A',
        scope: true,
        link: function (scope, element, attrs) {

          // start collapsed
          scope.collapsed = false;

          // create the function to toggle the collapse
          scope.toggle = function () {
            scope.collapsed = !scope.collapsed;
          };

          // wait for changes on the text
          scope.$watch(function(){ return element.text();}, function (text) {

            var maxLength = scope.$eval(attrs.maxLength);
            console.log(text);
            if (text.length > maxLength && element.data('seeMore')) {
              element.data('seeMore', true);
              // split the text in two parts, the first always showing
              var firstPart = String(text).substring(0, maxLength);
              var secondPart = String(text).substring(maxLength, text.length);

              // create some new html elements to hold the separate info
              var firstSpan = $compile('<span>' + firstPart + '</span>')(scope);
              var secondSpan = $compile('<span ng-if="collapsed">' + secondPart + '</span>')(scope);
              var moreIndicatorSpan = $compile('<span ng-if="!collapsed">... </span>')(scope);
              var lineBreak = $compile('<br ng-if="collapsed">')(scope);
              var toggleButton = $compile('<span class="collapse-text-toggle" ng-click="toggle()">{{collapsed ? "less" : "more"}}</span>')(scope);

              // remove the current contents of the element
              // and add the new ones we created
              element.empty();
              element.append(firstSpan);
              element.append(secondSpan);
              element.append(moreIndicatorSpan);
              element.append(lineBreak);
              element.append(toggleButton);
            }
          });
        }
      };
    }
});