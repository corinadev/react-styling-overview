export default class Library {
  name;
  version;
  createdAt;
  description;
  author;
  downloads;
  stars;
  repository;
  topics;

  constructor(localJson, packageJson, npmStats, githubRepo) {
    this.version = packageJson.version;
    this.name = packageJson.name;

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
    this.topics = githubRepo.topics;
  }

  getGithubUrl() {
    return `https://github.com/${this.repository}`;
  }
}