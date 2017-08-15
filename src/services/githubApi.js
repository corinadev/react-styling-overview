const cacheResponse = (url, response) => {
  let lastModified = response.headers.get('Last-Modified');
  let data = response.json();
  localStorage.setItem(url, {
    data: data,
    lastModified: lastModified
  });
};

const getFromAPIAndCacheResponse = (url, options, lastModified) => {
  options = options || {};
  if(!options.headers) {
    options.headers = new Headers();
  }

  if(lastModified) {
    options.headers.append('If-Modified-Since', lastModified);
  }

  return fetch(url, options || {})
    .then(response => {
      if(response.status === 304) {
        let cache = localStorage.getItem(url);
        return cache.data;
      }
      else {
        cacheResponse(url, response);
        return response.json();
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const getCachedResponse = (url, options) => {
  let cache = localStorage.getItem(url);
  if(!cache) {
    // If item isn't cached, call the API and cache it
    return getFromAPIAndCacheResponse(url, options);
  }

  // If item is already cached, check if we need to refresh
  return getFromAPIAndCacheResponse(url, options, cache.lastModified);
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
    return getCachedResponse(`https://api.github.com/repos/${packageGithubRepo}`, {
      headers: new Headers({
        "Accept": "application/vnd.github.mercy-preview+json"
      })
    });
  }
}