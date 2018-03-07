import React from 'react';
import PropTypes from 'prop-types';

export default class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    }
  }

  componentDidMount() {
    let stopper = this.props.text + '...';

    this.interval = window.setInterval(() => {
      if (this.state.text === stopper) {
        this.setState((prev, current) => {
          return {
            text: this.props.text
          }
        })
      } else {
        this.setState((prev, current) => {
          return {
            text: this.state.text + '.'
          }
        })
      }
    }, this.props.speed)
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render () {
    const styles = {
      content: {
        textAlign: 'center',
        fontSize: '35px'
      }
    }

    return (
      <div style={styles.content}>
        {this.state.text}
      </div>
    )
  }
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 150
};

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired,
};