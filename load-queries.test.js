import { loadQueries } from './load-queries.js';

describe('When loading multiple queries', () => {
  const queries = loadQueries('test.queries.json');
  describe('then the first query ', () => {
    const firstQuery = queries[0];
    describe('should have correct query criteria', () => {
      const queryCriteria = firstQuery.queryCriteria;
      it('should load the correct "campGroundId"', () => {
        expect(queryCriteria.campGroundId).toBe(232447);
      });
    });
    describe('should have correct filter criteria', () => {
      const filterCriteria = firstQuery.filterCriteria;
      it('should load the correct "desiredDates"', () => {
        expect(filterCriteria.desiredDates[0]).toBe("2023-03-27");
      });
    });
  });
});
