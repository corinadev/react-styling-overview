import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
jest.mock('./services/apiService', () => {
  return {
    getGithubPackageDetails: () => ({ name: 'Test', version: '123' }),
    getNpmPackageStats: () => ({ downloads: 100}),
    getGithubRepoDetails: () => ({ watchers_count: 12 })
  };
});
jest.mock('./services/cacheService', () => {
  return {
    getCacheForLibrariesInfo: () => ({ libraries: [{ name: 'Test', version: '123' }], lastCachedDate: new Date().getTime() }),
    setCacheForLibrariesInfo: () => {}
  };
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
