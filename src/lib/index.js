import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Waypoint from 'react-waypoint';

const Way = ({ handleWaypoint, waypoint }) => (
  <Waypoint
    onEnter={(a, b, c) => handleWaypoint('enter', a, b, c)}
    onLeave={(a, b, c) => handleWaypoint('leave', a, b, c)}
    topOffset={waypoint.topOffset}
    bottomOffset={waypoint.bottomOffset}
  />
);

Way.propTypes = {
  handleWaypoint: PropTypes.func.isRequired,
  waypoint: PropTypes.object.isRequired,
};

const AnimatedWrapper = props => {
  const StyledAnimatedWrapper = styled[`${props.el || 'div'}`]`
    animation-name: ${props => props.animation};
    animation-duration: ${props => props.duration}s;
    animation-iteration-count: ${props => props.iterate};
    animation-delay: ${props => props.delay};
    animation-direction: ${props => props.direction};
    animation-fill-mode: forwards;
    z-index: 20000;
  `;
  return <StyledAnimatedWrapper style={props.style} {...props} />;
};

AnimatedWrapper.propTypes = {
  animation: PropTypes.string.isRequired,
  duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iterate: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
  direction: PropTypes.oneOf([
    'normal',
    'reverse',
    'alternate',
    'alternate-reverse',
  ]),
};

class Bling extends React.Component {
  state = {
    type: '',
    animation: '',
    duration: 2,
    delay: 0,
    iterate: 1,
    direction: 'normal',
  };

  componentDidMount() {
    const { animate, waypoint } = this.props;
    if (animate && waypoint)
      throw new Error(
        'react-bling says: You cannot use the animate and waypoint props together.',
      );
    if (animate && !Array.isArray(animate)) {
      this.applyAnimation('animate', animate);
    } else if (animate && Array.isArray(animate)) {
      this.handleArray('animate', animate);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const check = this.state.animation !== nextState.animation;
    return check;
  }

  applyAnimation = (type, value) => {
    this.setState({
      type,
      animation: keyframes`${value.animation}`,
      duration: value.duration || 2,
      delay: value.delay || 0,
      iterate: value.iterate || 1,
      direction: value.direction || 'normal',
    });
  };

  handleArray = (type, prop) => {
    let dur = 0;
    prop.map((val, i) => {
      const duration = val.duration || 2;
      const iterate = val.iterate || 1;
      const total = duration * iterate;

      if (i === 0) {
        dur = total;
        this.applyAnimation('animate', val);
      } else {
        window.setTimeout(() => {
          this.applyAnimation(type, val);
        }, dur * 1000);
        dur = dur + total;
      }
      return false;
    });
  };

  handleWaypoint = (type, currentPosition, previousPosition, event) => {
    const { waypoint } = this.props;
    const isEnter = type === 'enter';
    const anim = isEnter ? waypoint.enter : waypoint.leave;
    if (!Array.isArray(anim)) {
      this.applyAnimation(type, anim);
    } else if (Array.isArray(anim)) {
      this.handleArray(type, anim);
    }

    if (isEnter && waypoint.onEnter) {
      waypoint.onEnter(currentPosition, previousPosition, event);
    } else if (!isEnter && waypoint.onLeave) {
      waypoint.onLeave(currentPosition, previousPosition, event);
    }
  };

  render() {
    const { waypoint, children, render } = this.props;

    const renderProp = () => {
      if (!render) return children;
      return typeof render === 'function' ? render() : render;
    };

    if (waypoint && !waypoint.position) {
      return (
        <Waypoint
          onEnter={(currentPosition, previousPosition, event) =>
            this.handleWaypoint(
              'enter',
              currentPosition,
              previousPosition,
              event,
            )
          }
          onLeave={(currentPosition, previousPosition, event) =>
            this.handleWaypoint(
              'leave',
              currentPosition,
              previousPosition,
              event,
            )
          }
        />
      );
    }

    return (
      <React.Fragment>
        {waypoint &&
          waypoint.position === 'above' && (
            <Way handleWaypoint={this.handleWaypoint} waypoint={waypoint} />
          )}

        <AnimatedWrapper
          {...this.props}
          className={this.props.className + ' bling'}
          type={this.state.type}
          animation={this.state.animation}
          duration={this.state.duration}
          delay={this.state.delay}
          iterate={this.state.iterate}
          direction={this.state.direction}
        >
          {renderProp()}
        </AnimatedWrapper>

        {waypoint &&
          waypoint.position === 'below' && (
            <Way handleWaypoint={this.handleWaypoint} waypoint={waypoint} />
          )}
      </React.Fragment>
    );
  }
}

Bling.propTypes = {
  el: PropTypes.string,
  animate: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  waypoint: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  render: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export * from 'react-animations';
export default Bling;
