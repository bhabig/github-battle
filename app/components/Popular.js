import React from 'react';
import PropTypes from 'prop-types';

// Stateless Functional Component
function SelectLanguage (props) {
  let languages = [ 'All', 'JavaScript', 'Ruby', 'Elixir', 'CSS', 'Python', 'Go', 'Rust', 'R' ];

  return (
    <ul className="languages">
      {
        languages.map( l => {
          return (
            <li
              key={l}
              onClick={props.onSelect.bind(null, l)}
              style={l === props.selectedLanguage ? { color: 'red' } : null }>
              {l}
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


export default class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: 'All'
    };

    //this.updateLanguage = this.updateLanguage.bind(this);
  }


  render() {

    const updateLanguage = lang => {
      this.setState({
        selectedLanguage: lang
      })
    }

    return (
      <div>
        <h1>Popular:</h1>
        <p>Selected Language: {this.state.selectedLanguage}</p>
        <SelectLanguage selectedLanguage={this.state.selectedLanguage} onSelect={updateLanguage} />
      </div>
    )
  }
}
