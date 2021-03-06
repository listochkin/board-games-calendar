define(function (require) {
  'use strict';
  return ReadMoreDirective;

  function ReadMoreDirective() {
    return {
      restrict: 'A',
      transclude: true,
      replace: true,
      template: '<p></p>',
      scope: {
        moreText: '@',
        lessText: '@',
        words: '@',
        ellipsis: '@',
        char: '@',
        limit: '@',
        content: '@'
      },
      link: link
    };
    function link(scope, elem, attr, ctrl, transclude) {
      var moreText = angular.isUndefined(scope.moreText) ? ' <a class="read-more">Read More...</a>' : ' <a class="read-more">' + scope.moreText + '</a>',
          lessText = angular.isUndefined(scope.lessText) ? ' <a class="read-less">Less ^</a>' : ' <a class="read-less">' + scope.lessText + '</a>',
          ellipsis = angular.isUndefined(scope.ellipsis) ? '' : scope.ellipsis,
          limit = angular.isUndefined(scope.limit) ? 150 : scope.limit;

      attr.$observe('content', function (str) {
        readmore(str);
      });

      transclude(scope.$parent, function (clone, scope) {
        readmore(clone.text().trim());
      });

      function readmore(text) {

        var orig = text,
            regex = /\s+/gi,
            charCount = text.length,
            wordCount = text.trim().replace(regex, ' ').split(' ').length,
            countBy = 'char',
            count = charCount,
            foundWords = [],
            markup = text,
            more = '';

        if (!angular.isUndefined(attr.words)) {
          countBy = 'words';
          count = wordCount;
        }

        if (countBy === 'words') {

          foundWords = text.split(/\s+/);

          if (foundWords.length > limit) {
            text = foundWords.slice(0, limit).join(' ') + ellipsis;
            more = foundWords.slice(limit, count).join(' ');
            markup = text + moreText + '<span class="more-text">' + more + lessText + '</span>';
          }

        } else {

          if (count > limit) {
            text = orig.slice(0, limit) + ellipsis;
            more = orig.slice(limit, count);
            markup = text + moreText + '<span class="more-text">' + more + lessText + '</span>';
          }

        }

        elem.append(markup);
        elem.on('click', '.read-more', function () {
          $(this).hide();
          elem.find('.more-text').addClass('show').slideDown();
        });
        elem.on('click', '.read-less', function () {
          elem.find('.read-more').show();
          elem.find('.more-text').hide().removeClass('show');
        });

      }
    }
  }
});