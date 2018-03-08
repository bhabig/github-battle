import React from 'react';
import PropTypes from 'prop-types';
import PlayerPreview from './PlayerPreview';
const Link = require('react-router-dom').Link;
import api from '../utils/api';

class PlayerInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    let value = e.target.value;

    this.setState(() => {
      return {
        username: value
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    api.fighterRepos(this.state.username).then(resp => {
      resp.data.length > 0 ?
        this.props.onSubmit(this.props.id, this.state.username, true) :
        this.props.onSubmit(this.props.id, this.state.username, false)
    });
  }

  render() {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          type='text'
          id='username'
          placeholder='github username'
          onChange={this.handleChange}
          value={this.state.username}
        />
        <button
          className='button'
          type='submit'
          disabled={!this.state.username}>
          Submit
        </button>
      </form>
    )
  }
}
PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playerOneImage: null,
      playerOneName: '',
      playerTwoImage: null,
      playerTwoName: '',
      playerOneStatus: false,
      playerTwoStatus: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleSubmit (id, username, signal) {
    this.setState((prev, current) => {
      return {
        [id+'Name']: username,
        [id+'Image']: 'https://github.com/'+username+'.png?size=200',
        [id+'Status']: signal
      }
    })
  }

  handleReset(id) {
    this.setState(() => {
      return {
        [id+'Name']: '',
        [id+'Image']: null
      }
    })
  }

  render() {
    let match = this.props.match;
    let playerOneName = this.state.playerOneName;
    let playerTwoName = this.state.playerTwoName;
    let playerOneImage = this.state.playerOneImage;
    let playerTwoImage = this.state.playerTwoImage;
    let playerOneStatus = this.state.playerOneStatus;
    let playerTwoStatus = this.state.playerTwoStatus;

    return (
      <div>
        <div className='row'>
          {!playerOneStatus &&
            <div>
              <PlayerInput
                id='playerOne'
                label='Player One'
                onSubmit={this.handleSubmit}
              />
              <p style={{color: 'red'}}>
                {(!playerOneStatus && playerOneName !== '') &&
                  "Gotta commit to compete! This account has no commits..."
                }
              </p>
            </div>
          }

          {playerOneStatus &&
            <PlayerPreview
              avatar={playerOneImage}
              username={playerOneName}
            >
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerOne')}
              >
                Reset
              </button>
            </PlayerPreview>}

          {!playerTwoStatus &&
            <div>
              <PlayerInput
                id='playerTwo'
                label='Player Two'
                onSubmit={this.handleSubmit}
              />
              <p style={{color: 'red'}}>
                {(!playerTwoStatus && playerTwoName !== '') &&
                  "Gotta commit to compete! This account has no commits..."
                }
              </p>
            </div>
          }

          {playerTwoStatus &&
            <PlayerPreview
              avatar={playerTwoImage}
              username={playerTwoName}
            >
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerTwo')}
              >
                Reset
              </button>
            </PlayerPreview>}
        </div>

        {playerOneStatus && playerTwoStatus &&
          <Link
            className='button'
            to={{
              pathname: match.url + '/results',
              search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
            }}>
            Battle
          </Link>}
      </div>
    )
  }

}
