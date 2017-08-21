
const localStorageWrapper = {
  setItem: (key, value) => {
    localStorage.setItem(key, value);
  },

  getItem: (key) => {
    return localStorage.getItem(key);
  }
};


export default {
  setCacheForLibrariesInfo: (libraries) => {
    localStorageWrapper.setItem('cachedLibraries', JSON.stringify({
      libraries: libraries,
      lastCachedDate: new Date().getTime()
    }))
  },

  getCacheForLibrariesInfo: () => {
    if (localStorageWrapper.getItem('cachedLibraries')) {
      return JSON.parse(localStorageWrapper.getItem('cachedLibraries'))
    }
    return null;
  }
}