import template from './timePlannerContainerTemplate.html';
import merge from 'deepmerge';

angular
  .module('timePlannerContainerDirective', [])
  .directive('timePlannerContainer', ['$locale', 'LOCALES', ($locale, LOCALES) => {
    let link = (scope) => {
      let localeId = LOCALES.AVAILABLE.includes($locale.id) ? $locale.id : LOCALES.DEFAULT;

      // we use an object with merged default locale and scope override(if any)
      scope.locale = merge(require(`../timePlannerLocales/time-planner-locale_${localeId}`), scope.options.locale);

      scope.segments = _getSegments();

      // Get segments for planner, hours, week, dates range. Default is a week.
      function _getSegments() {
        switch (scope.options.timeRangeType) { // rename
          case 'day':
            // reserved for future use
            break;
          case 'range':
            // reserved for future use
            break;
          case 'week':
          default:
            return _getWeekDays();
        }
      }

      // I use only days from locales. First day of the week is the same as Date() (0 - Sun)
      function _getWeekDays() {
        let
          week = [...$locale.DATETIME_FORMATS.SHORTDAY],
          alteredWeek = week.splice(scope.options.firstDay  || 0, week.length);
        return [...alteredWeek, ...week];
      }

    };

    return {
      restrict: 'E',
      scope: {
        options: '=',
        rows: '='
      },
      link: link,
      template: template
    };
  }]);
