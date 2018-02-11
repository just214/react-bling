import React from 'react';
import Bling, { tada, flip, fadeOut, merge } from '../lib';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: 100vh;
  height: 100%;
  padding-bottom: 200px;
`;

export const FullHeight = styled.div`
  flex: 1 100%;
  text-align: ${props => (props.center ? 'center' : '')};
  height: 100vh;
  margin-top: 75px;
`;

export const Button = styled.button`
  height: 50px;
  width: 100px;
  border-radius: 10px;
  border: 2px solid hotpink;
  outline: none;
  cursor: pointer;
  font-size: 2em;
`;

class App extends React.Component {
  state = { show: false };
  handleShow = () => this.setState(prevState => ({ show: !prevState.show }));
  render() {
    return (
      <Container>
        <FullHeight center>
          <Button onClick={this.handleShow}>show</Button>
          <p>{this.state.show ? 'IS SHOWING' : 'IS NOT SHOWING'}</p>
        </FullHeight>
        <FullHeight center>
          {this.state.show && (
            <Bling
              // animate={{ animation: tada }}
              waypoint={{
                position: 'above',
                enter: {
                  animation: merge(tada, flip),
                  duration: 7,
                },
                leave: {
                  animation: fadeOut,
                  duration: 5,
                },
              }}
              render={<h1>Hello</h1>}
            />
          )}
        </FullHeight>
      </Container>
    );
  }
}

export default App;
