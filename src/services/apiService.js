const getFromAPI = (url, options) => {
  return fetch(url, options || {})
    .then(response => {
      return response.json();
    })
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default {
  /**
   * NPM Registry does not support CORS requests
   * so get the information from Github instead
   * https://github.com/npm/registry/issues/110
   *
   * @param packageGithubRepo
   */
  getGithubPackageDetails: (packageGithubRepo) => {
    return getFromAPI(`https://raw.githubusercontent.com/${packageGithubRepo}/master/package.json`);
  },

  /**
   * Retrieve Github project information (stargazers, date created etc)
   *
   * Send extra header to tell Github to also return "topics" for the repo
   * https://developer.github.com/v3/repos/#list-all-topics-for-a-repository
   * @param packageGithubRepo
   */
  getGithubRepoDetails: (packageGithubRepo) => {
    return getFromAPI(`http://api.github.com/repos/${packageGithubRepo}`, {
      headers: new Headers({
        "Accept": "application/vnd.github.mercy-preview+json"
      })
    });
  },

  /**
   * Retrieve download count information
   * Send really wide interval to simulate "all time"
   *
   * @param packageName
   */
  getNpmPackageStats: (packageName) => {
    const start = '2000-01-01';
    const end = '2099-01-01';
    return getFromAPI(`https://api.npmjs.org/downloads/point/${start}:${end}/${packageName}`);
  }
}