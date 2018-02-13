import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';

//Stateless Functional Component
function SelectLanguage (props) {
  let languages = [ 'All', 'JavaScript', 'Ruby', 'Elixir', 'CSS', 'Python', 'Go', 'Rust', 'R' ];
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

  updateLanguage(lang) {
    this.setState({
      selectedLanguage: lang,
      repos: null,
    });

    api.fetchPopularRepos(this.state.selectedLanguage)
      .then(resp => {
        this.setState({
          repos: resp,
        });
      });
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  render() {
    return (
      <div>
        <h1>Popular:</h1>
        <p>Selected Language: {this.state.selectedLanguage}</p>
        <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
      </div>
    )
  }
}

// non-working method below:
// *why is there a syntax error when trying to use arrow Fn syntax for updateLanguage?

// export default class Popular extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       selectedLanguage: 'All',
//       repos: null,
//     }
//   }
//
//   updateLanguage = lang => { ****** <- get syntax error when trying to use arrow Fn ********
//     this.setState({
//       selectedLanguage: lang,
//       repos: null,
//     });
//
//     api.fetchPopularRepos(this.state.selectedLanguage)
//       .then(resp => {
//         this.setState({
//           repos: resp,
//         });
//       });
//   }
//
//   componentDidMount() {
//     this.updateLanguage(this.state.selectedLanguage);
//   }
//
//   render() {
//     return (
//       <div>
//         <h1>Popular:</h1>
//         <p>Selected Language: {this.state.selectedLanguage}</p>
//         <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={this.updateLanguage} />
//       </div>
//     )
//   }
// }
