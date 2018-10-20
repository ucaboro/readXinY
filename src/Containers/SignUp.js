import React, { Component } from 'react';
import request from 'superagent';
import {
  Link,
  withRouter,
} from 'react-router-dom';
import { auth, db } from '../firebase/index.js';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: '',
};

class SignUp extends Component {
  constructor(props) {
    super(props);
      this.state = { ...INITIAL_STATE };
}

  handleInputChange = event => {
    const { value, name } = event.target;

    const user = {};
    user[name] = value;

    this.setState(user);
  };

  onSubmit = (event) => {
  const {
    email,
    passwordOne,
  } = this.state;

  const {
  history,
  } = this.props;

  auth.doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
      // Create a user in your own accessible Firebase Database too
      db.doCreateUser(authUser.user.uid, email)
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          history.push(`/main/${authUser.user.uid}`);
        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });
    })
    .catch(error => {
      this.setState(byPropKey('error', error));

    });

  event.preventDefault();
}


  /*onSubmit = event => {
    event.preventDefault();
    const api = 'http://localhost:3333/api/users/login';
      fetch(api, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log({ res });
        if (res.ok) {
          console.log({ res });
          this.props.history.push("/");
        } else {
          const error = new Error(res);
          throw error;
        }
      })
      .catch(err => {
        console.error({ err });
      });

    request
      .post(api)
      .send(this.state)
      .then(res => {
        console.log('yay got:', res.body);
        this.props.history.push('/');
      })
      .catch(err => {
        console.error('err response:', err.response);
        this.setState({ errMsg: err.response.text });
      });
  };*/

  render() {
    const {
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === ''


    return (
      <section className="hero is-fullheight">
        <div className="">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <p className="subtitle has-text-grey">Please sign up to proceed.</p>
              <div className="box">
                <form onSubmit={this.onSubmit}>
                  {error && (
                    <div className="notification is-danger">
                      <button className="delete" onClick={()=>this.setState({error: ''})} />
                      {error.message}
                    </div>
                  )}
                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        autoFocus=""
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        placeholder="Your Password"
                        onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                        value={passwordOne}
                        required
                      />

                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          placeholder="Confirm Your Password"
                          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                          value={passwordTwo}
                          required
                        />
                      </div>
                    </div>

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
              <Link to="/login">
                Login &nbsp;·&nbsp;
              </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(SignUp);
