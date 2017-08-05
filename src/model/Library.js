export default class Library {
  name;
  version;
  createdAt;
  description;
  author;
  downloads;
  stars;
  repository;

  constructor(data) {
    for(let key in data) {
      this[key] = data[key];
    }
  }

  getGithubUrl() {
    return `https://github.com/${this.repository}`;
  }
}