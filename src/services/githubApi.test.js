import githubApi from './githubApi';

beforeEach(function() {
  global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn()
  };

  global.fetch = jest.fn();
});

afterEach(() => {
  global.localStorage.getItem.mockClear();
  global.localStorage.setItem.mockClear();
  global.fetch.mockClear();
});

const LAST_MODIFIED = 'Thu, 05 Jul 2012 15:31:30 GMT';

describe('get repo details from github', () => {

  beforeEach(() => {
    global.fetch.mockReturnValueOnce(new Promise((resolve) => {
      resolve({
        headers: new Headers({
          'Last-Modified': LAST_MODIFIED
        }),
        ok: true,
        status: 200,
        json: function() {
          return new Promise((resolve) => { resolve({ name: 'React' })})
        }
      });
    }));
    global.localStorage.getItem.mockReturnValue(JSON.stringify({
      data: { name: 'React' },
      lastModified: LAST_MODIFIED
    }));
  });

  it('gets the data', async () => {
    const response = await githubApi.getRepoDetails('facebook/react');
    expect(response.name).toBe('React');
  });

  it('saves it to the cache', async () => {
    const response = await githubApi.getRepoDetails('facebook/react');
    expect(global.localStorage.setItem).toBeCalled();

    let params = global.localStorage.setItem.mock.calls[0];
    expect(params[0]).toEqual("https://api.github.com/repos/facebook/react");

    let cache = JSON.parse(params[1]);
    expect(cache.data).toEqual(response);
    expect(cache.lastModified).toEqual(LAST_MODIFIED);
    expect(cache.lastRequested).toBeDefined();
  });

});

describe('gets repo details from cache', () => {

  describe('resource not modified', () => {
    beforeEach(() => {
      global.localStorage.getItem.mockReturnValue(JSON.stringify({
        data: { name: 'React' },
        lastModified: LAST_MODIFIED
      }));
      global.fetch.mockReturnValueOnce(new Promise((resolve) => {
        resolve({
          headers: new Headers({
            'Last-Modified': LAST_MODIFIED
          }),
          ok: true,
          status: 304
        });
      }));
    });

    it('reads from cache', async () => {
      await githubApi.getRepoDetails('facebook/react');
      expect(global.localStorage.getItem).toBeCalled();
    });

    it('gets correct data', async () => {
      const response = await githubApi.getRepoDetails('facebook/react');
      expect(response.name).toBe('React');
    });
  });

  describe('resource modified', () => {
    const UPDATED_MODIFIED_DATE = 'Thu, 05 Jul 2015 15:31:30 GMT';
    beforeEach(() => {
      global.localStorage.getItem.mockReturnValueOnce(JSON.stringify({
        data: { name: 'React' },
        lastModified: LAST_MODIFIED
      }));
      global.localStorage.getItem.mockReturnValueOnce(JSON.stringify({
        data: { name: 'React new' },
        lastModified: UPDATED_MODIFIED_DATE
      }));
      global.fetch.mockReturnValue(new Promise((resolve) => {
        resolve({
          headers: new Headers({
            'Last-Modified': UPDATED_MODIFIED_DATE
          }),
          ok: true,
          status: 200,
          json: function() {
            return new Promise((resolve) => { resolve({ name: 'React new' })})
          }
        });
      }));
    });

    it('gets correct data', async () => {
      const response = await githubApi.getRepoDetails('facebook/react');
      expect(response.name).toBe('React new');
    });


    it('saves it to cache', async () => {
      const response = await githubApi.getRepoDetails('facebook/react');
      expect(global.localStorage.setItem).toBeCalled();

      let params = global.localStorage.setItem.mock.calls[0];
      expect(params[0]).toEqual("https://api.github.com/repos/facebook/react");
      let cache = JSON.parse(params[1]);
      expect(cache.data).toEqual(response);
      expect(cache.lastModified).toEqual(UPDATED_MODIFIED_DATE);
      expect(cache.lastRequested).toBeDefined();
    });

  });

});