import '../../angular-time-planner';
import {mockData} from './_data.mock';

describe('timePlannerContainer directive', () => {
  let $scope, $compile, element;

  beforeEach(angular.mock.module('angularTimePlanner'));
  beforeEach(() => {
    inject(($rootScope, _$compile_) => {
      const html = '<time-planner-container options="options" rows="rows"></time-planner-container>';

      $compile = _$compile_;
      $scope = $rootScope.$new();

      $scope.rows = mockData.rows;
      $scope.options = mockData.options;

      element = $compile(html)($scope);
      $scope.$digest();
    });
  });

  describe('creating segments for timeScope === \'day\'', () => {
    it('should create 24 segments', () => {
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.segments.length).toEqual(24);
    });

    it('should create segments with numeric values of hours', () => {
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.segments[4]).toEqual(4);
    })
  });

  describe('creating segments for timeScope === \'week\'', () => {
    beforeEach(() => {
      $scope.options.timeScope = 'week';
      $scope.$digest();
    });

    it('should create 7 segments', () => {
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.segments.length).toEqual(7);
    });

    it('should create segments with text value of a day', () => {
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.segments[0]).toEqual('Sun');
    });

    it('should create segments with Monday as a first day when firstDay option is set to 1', () => {
      $scope.options.firstDay = 1;
      $scope.$digest();
      const isolatedScope = element.isolateScope();
      expect(isolatedScope.segments[0]).toEqual('Mon');
    });
  });
});
