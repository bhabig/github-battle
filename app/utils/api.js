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
  return repos.data.reduce((count, repo) => count + repo.stargazers_count, 0)
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

const getUserData = player => {
  //axios.all takes in array of promises and fires then fn after all promises in array are resolved.
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then(responses => {
    let profile = responses[0];
    let repos = responses[1];
    return {
      profile: profile,
      score: calculateScore(profile, repos)
    }
  })
}

const sortPlayers = players => {
  return players.sort((prev, current) => current.score - prev.score);
}

module.exports = {
  battle: players => {
    return axios.all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError)
  },
  fighterRepos: player => {
    return getRepos(player);
  },
  fetchPopularRepos: language => {
    let encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:'+ language + '&sort=stars&order=desc&type=Repositories');

    return axios.get(encodedURI)
      .then(res => res.data.items);
  }
}
