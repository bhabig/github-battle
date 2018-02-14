import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

//Stateless Functional Component
const SelectLanguage = props => {
  let languages = [ 'All', 'CSS', 'Elixir', 'Go', 'JavaScript', 'Node', 'Python', 'R', 'React', 'Ruby',  'Rust' ];
  return (
    <ul className="languages">
      {
        languages.map( lang => {
          return (
            <li
              key={lang}
              onClick={props.onSelect.bind(null, lang)}
              style={lang === props.selectedLanguage ? { color: 'red' } : null }>
              {lang}
            </li>
          )
        })
      }
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

const ReposGrid = props => {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index) => (
        <li key={repo.name} className="popular-item">
          <div className="popular-rank">#{index+1}</div>
          <ul className="space-list-items">
            <li>
              <img
                src={repo.owner.avatar_url}
                alt={'Avatar for ' + repo.owner.login}
                className="avatar"
              />
            </li>
            <li><a href={repo.html_url}>{repo.name}</a></li>
            <li>@{repo.owner.login}</li>
            <li>{repo.stargazers_count} stars</li>
          </ul>
        </li>
      ))}
    </ul>
  )
}

ReposGrid.propTypes = {
  repos: PropTypes.arrayOf(PropTypes.object).isRequired
}

// working method #1 below:

export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All',
      repos: null,
    }
    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      repos: null,
    }, () => (api.fetchPopularRepos(this.state.selectedLanguage)
        .then((resp) => (
          this.setState({
            repos: resp
          })
        )
      ))
    );

  }

  render() {
    console.log(this.state.repos)
    return (
      <div>
        <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
        {!this.state.repos ?
          <p>LOADING...</p> :
          <ReposGrid repos={this.state.repos} />}
      </div>
    )
  }
}
