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

    return new Library({
      version: packageJson.version,
      name: packageJson.name,
      author: packageJson.author,
      description: packageJson.description,
      downloads: npmStats.downloads,
      repository: library.repository,
      stars: githubRepo.watchers_count,
      createdAt: githubRepo.created_at
    })
  });
}

export default {
  getReactStylingLibraries: () => (
    Promise.all(libraries.map( library => getLibraryInformation(library)))
  )
}