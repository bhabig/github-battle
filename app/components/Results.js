import React from 'react';
import queryString from 'query-string';
import api from '../utils/api';
import Battle from './Battle';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
import Loading from './Loading';

const Profile = (props) => {
  return (
    <PlayerPreview
      avatar={props.info.avatar_url}
      username={props.info.login}
    >
      <ul className="space-list-items">
        {props.info.name && <li>{props.info.name}</li>}
        {props.info.location && <li>{props.info.location}</li>}
        {props.info.company && <li>{props.info.company}</li>}
        <li>Followers: {props.info.followers}</li>
        <li>Following: {props.info.following}</li>
        <li>Public Repos: {props.info.public_repos}</li>
        {props.info.blog && <li><a href={props.info.blog}>{props.info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}
Profile.propTypes = {
  info: PropTypes.object.isRequired
}

const Player = (props) => {
  return (
    <div>
      <h1 className="header">
        {props.label}
      </h1>
      <h3 style={{textAlign: 'center'}}>
        Score: {props.score}
      </h3>
      <Profile info={props.profile} />
    </div>
  )
}
Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    let players = queryString.parse(this.props.location.search);
    debugger;
    api.battle([players.playerOneName, players.playerTwoName])
      .then(resp => {
        // if there was an error, handle it with message.
        if (resp === null) {
          return this.setState(() => {
            return {
              error: 'Looks like there was an error. We recommend checking that both users entered exist on GitHub.',
              loading: false
            }
          })
        }
        //if no error, update winner, loser, and loading state:
        this.setState(() => {
          return {
            winner: resp[0],
            loser: resp[1],
            loading: false
          }
        });
      });
  }

  render() {
    let error = this.state.error;
    let loading = this.state.loading;
    let winningProfile;
    let winningScore;
    let losingProfile;
    let losingScore;
    //waiting for response
    if(loading === true) {
      return (
        <Loading />
      );
    }
    //response was an error
    if(error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      );
    }
    //set and display data when response isn't error
    winningProfile = this.state.winner.profile;
    winningScore = this.state.winner.score;
    losingProfile = this.state.loser.profile;
    losingScore = this.state.loser.score;

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winningScore}
          profile={winningProfile}
        />
        <Player
          label='Loser'
          score={losingScore}
          profile={losingProfile}
        />
      </div>
    );
  }
}
