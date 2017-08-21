// @flow

class GithubRepositoryInfo {
  created_at: string;
  updated_at: string;
  watchers_count: number;
  topics: string[];

  constructor(data) {
    data = data || {};
    this.created_at = data.created_at || null;
    this.updated_at = data.updated_at || null;
    this.watchers_count = data.watchers_count || 0;
    this.topics = data.topics || [];
  }
}

const getFromAPI = (url, options) => {
  options = options || {};
  if(!options.headers) {
    options.headers = new Headers();
  }

  return fetch(url, options || {})
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        return new GithubRepositoryInfo();
      }
    })
    .then(json => json)
    .catch((error) => {
      console.error(error);
    });
};

export default {

  /**
   * Retrieve Github project information (stargazers, date created etc)
   *
   * Send extra header to tell Github to also return "topics" for the repo
   * https://developer.github.com/v3/repos/#list-all-topics-for-a-repository
   * @param packageGithubRepo
   */
  getRepoDetails: (packageGithubRepo) => {
    return getFromAPI(`https://api.github.com/repos/${packageGithubRepo}`, {
      headers: new Headers({
        "Accept": "application/vnd.github.mercy-preview+json"
      })
    });
  }
}