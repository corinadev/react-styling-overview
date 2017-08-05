import apiService from './apiService';
import libraries from '../data/libraries.json';
import Library from '../model/Library';

function getLibraryInformation(library) {
  return Promise.all([
    apiService.getGithubPackageDetails(library.repository),
    apiService.getNpmPackageStats(library.name),
    apiService.getGithubRepoDetails(library.repository)
  ]).then(result => {
    const packageJson = result[0];
    const npmStats = result[1];
    const githubRepo = result[2];

    return new Library(library, packageJson, npmStats, githubRepo);
  });
}

export default {
  getReactStylingLibraries: () => (
    Promise.all(libraries.map( library => getLibraryInformation(library)))
  )
}