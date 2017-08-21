jest.mock('../config', () => (
  { KEEP_CACHE_DURATION: 500 }
));
jest.mock('./githubApi');
jest.mock('./cacheService', () => {
  var cache = null;
  return {
    setCacheForLibrariesInfo: jest.fn((list) => (cache = { libraries: list, lastCachedDate: new Date().getTime() })),
    getCacheForLibrariesInfo: jest.fn(() => (cache))
  }
});

describe('get list of react libraries', () => {
  let dataService = require('./dataService').default;
  let githubApi = require('./githubApi').default;
  let Library = require('../model/Library').default;

  describe('data structure', () => {
    let data = [];

    beforeEach(done => {
      dataService.getReactStylingLibraries().then(info => {
        data = info;
        done();
      });
    });

    it('returns at least one item', () => {
      expect(data.length).toBeGreaterThan(0);
    });

    it('returns the correct fields', () => {
      const library = data[0];
      expect(library.name).toBeDefined();
      expect(library.version).toBeDefined();
    });
  });

  describe('caching', () => {
    beforeEach(() => {
      // Force clean cache every time for testing
      jest.resetModules();
      dataService = require('./dataService').default;
      githubApi = require('./githubApi').default;

      githubApi.getRepoDetails = jest.fn();
    });

    afterEach(() => {
      githubApi.getRepoDetails.mockClear();
    });

    it('calls the backend the first time', () => {
      return dataService.getReactStylingLibraries().then(() => {
        return expect(githubApi.getRepoDetails.mock.calls.length).toBe(1);
      });
    });

    describe('when hits cache', () => {
      let cachedData;

      beforeEach((done) => {
        return dataService.getReactStylingLibraries().then(() => {
          return dataService.getReactStylingLibraries().then((data) => {
            cachedData = data;
            done();
          });
        });
      });

      it('reads repo info from the cache when calling the second time', () => {
          return expect(githubApi.getRepoDetails.mock.calls.length).toBe(1);
      });

      it('returns Library objects from cache', () => {
        return expect(cachedData[0].getGithubUrl).toBeDefined();
      });

    });
  });


});


