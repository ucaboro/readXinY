import React, { Component } from 'react';
import request from 'superagent';
import {Link, withRouter} from 'react-router-dom';
import { auth } from '../firebase/index.js';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

export default class Login extends Component {
  constructor(props) {
    super(props);
      this.state = { ...INITIAL_STATE };
  }


  onSubmit = (event) => {
  const {
    email,
    password,
  } = this.state;

  const {
    history,
  } = this.props;

  auth.doSignInWithEmailAndPassword(email, password)
    .then(() => {
      this.setState({ ...INITIAL_STATE });
      history.push(`/main`);
    })
    .catch(error => {
      this.setState(byPropKey('error', error));
    });

  event.preventDefault();
}

  render() {

    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <section className="hero is-fullheight">
        <div className="">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <p className="subtitle has-text-grey">Please login to proceed.</p>
              <div className="box">
                <form onSubmit={this.onSubmit}>
                  {error && (
                    <div className="notification is-danger">
                      <button className="delete" />
                      {error.message}
                    </div>
                  )}
                  <div className="field">
                    <div className="control">
                      <input
                        value={email}
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        autoFocus=""
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        value={password}
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Your Password"
                        onChange={this.handleInputChange}onChange={event => this.setState(byPropKey('password', event.target.value))}
                        required
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label className="checkbox">
                      <input type="checkbox" />
                      Remember me
                    </label>
                  </div>
                  <button disabled={isInvalid} className="button is-block is-primary is-fullwidth" type="submit">
                    Login
                  </button>
                </form>
              </div>
              <p className="has-text-grey">
                <Link to="/signup">
                  Sign Up &nbsp;·&nbsp;
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
