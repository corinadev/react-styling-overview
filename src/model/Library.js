// @flow

export default class Library {
  name;
  version;
  createdAt;
  updatedAt;
  description;
  author;
  downloads;
  stars;
  repository;
  topics;

  constructor(localJson = {}, packageJson = {}, npmStats = {}, githubRepo: GithubRepositoryInfo = {}) {
    this.version = packageJson.version;
    this.name = packageJson.name || localJson.name;

    this.author = packageJson.author ?
                      typeof packageJson.author === 'string' ?
                          packageJson.author :
                          packageJson.author.name
                      : '';

    this.description = packageJson.description;
    this.downloads = npmStats.downloads;
    this.repository = localJson.repository;
    this.stars = githubRepo.watchers_count;
    this.createdAt = githubRepo.created_at;
    this.updatedAt = githubRepo.updated_at;
    this.topics = githubRepo.topics;
  }

  static fromCache(data) {
    let library = new Library();
    Object.assign(library, data);
    return library;
  }

  getGithubUrl() {
    return `https://github.com/${this.repository}`;
  }
}