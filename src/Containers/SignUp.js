import React, { Component } from 'react';
import request from 'superagent';
import {Link} from 'react-router-dom';


export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
      },
      errMsg: '',
    };
  }

  handleInputChange = event => {
    const { value, name } = event.target;

    const user = {};
    user[name] = value;

    this.setState(user);
  };

  onSubmit = event => {
    event.preventDefault();
    const api = 'http://localhost:3333/api/users/login';
    /* fetch(api, {
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
      }); */

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
  };

  render() {
    return (
      <section className="hero is-fullheight">
        <div className="">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <p className="subtitle has-text-grey">Please sign up to proceed.</p>
              <div className="box">
                <form onSubmit={this.onSubmit}>
                  {this.state.errMsg && (
                    <div className="notification is-danger">
                      <button className="delete" />
                      {this.state.errMsg}
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
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Your Password"
                        onChange={this.handleInputChange}
                        required
                      />

                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="password2"
                          name="password2"
                          placeholder="Confirm Your Password"
                          onChange={this.handleInputChange}
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
                  <button className="button is-block is-primary is-fullwidth" type="submit">
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
