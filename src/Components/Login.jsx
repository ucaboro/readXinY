import React, { Component } from 'react';
import request from 'superagent';

export default class Login extends Component {
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
      <section class="hero is-fullheight">
        <div class="hero-body">
          <div class="container has-text-centered">
            <div class="column is-4 is-offset-4">
              <p class="subtitle has-text-grey">Please login to proceed.</p>
              <div class="box">
                <form onSubmit={this.onSubmit}>
                  {this.state.errMsg && (
                    <div class="notification is-danger">
                      <button class="delete" />
                      {this.state.errMsg}
                    </div>
                  )}
                  <div class="field">
                    <div class="control">
                      <input
                        class="input"
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        autofocus=""
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div class="field">
                    <div class="control">
                      <input
                        class="input"
                        type="password"
                        name="password"
                        placeholder="Your Password"
                        onChange={this.handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div class="field">
                    <label class="checkbox">
                      <input type="checkbox" />
                      Remember me
                    </label>
                  </div>
                  <button class="button is-block is-primary is-fullwidth" type="submit">
                    Login
                  </button>
                </form>
              </div>
              <p class="has-text-grey">
                <a href="../">Sign Up</a> &nbsp;·&nbsp;
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
