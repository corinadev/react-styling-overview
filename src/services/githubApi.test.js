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

});