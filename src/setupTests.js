jest.mock('./services/apiService', () => {
  return {
    getGithubPackageDetails: () => ({ name: 'Test', version: '123' }),
    getNpmPackageStats: () => ({ downloads: 100}),
    getGithubRepoDetails: () => ({ watchers_count: 12 })
  };
});