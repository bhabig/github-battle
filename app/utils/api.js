import axios from 'axios';

const id = "5f05b0b2201d68e609a6";
const secret = "9d705bb725baa19ecc6875101402f3a0d57ca01d";
const params = "?client_id=" + id + "&client_secret=" + secret;

const getProfile = username => {
  return axios.get('https://api.github.com/users/' + username + params)
    .then(user => user.data);
}

const getRepos = username => {
  return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

const getStarCount = repos => {
  return repos.reduce((count, repo) => count + repo.stargazers_count, 0)
}

const calculateScore = (profile, repos) => {
  let followers = profile.followers;
  let totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

const handleError = error => {
  console.warn(error);
  return null;
}



module.exports = {
  battle: players => {

  },
  fetchPopularRepos: language => {
    let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(res => res.data.items);
  }
}
