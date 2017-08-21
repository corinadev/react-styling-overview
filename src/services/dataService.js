import apiService from './apiService';
import libraries from '../data/libraries.json';
import Library from '../model/Library';
import cacheService from './cacheService';
import { KEEP_CACHE_DURATION } from '../config';

function getLibraryInformation(library) {
  return Promise.all([
    apiService.getGithubPackageDetails(library.repository, library.packageJson),
    apiService.getNpmPackageStats(library.name),
    apiService.getGithubRepoDetails(library.repository)
  ]).then(result => {
    const packageJson = result[0];
    const npmStats = result[1];
    const githubRepo = result[2];

    return new Library(library, packageJson, npmStats, githubRepo);
  });
}

function getCachedLibraries() {
  let cachedLibrariesInfo = cacheService.getCacheForLibrariesInfo();
  return cachedLibrariesInfo.libraries.map((data) => (Library.fromCache(data)));
}

function isCacheStillValid() {
  let cachedLibrariesInfo = cacheService.getCacheForLibrariesInfo();
  return cachedLibrariesInfo
    && (new Date().getTime() - new Date(cachedLibrariesInfo.lastCachedDate).getTime()) < KEEP_CACHE_DURATION;
}

export default {
  getReactStylingLibraries: () => {
    if(isCacheStillValid()) {
      return Promise.resolve(getCachedLibraries());
    }

    return Promise
      .all(libraries
        .map(library => getLibraryInformation(library))
      ).then((data) => {
        cacheService.setCacheForLibrariesInfo(data);
        return new Promise((resolve) => (resolve(data)));
      });
  }
}