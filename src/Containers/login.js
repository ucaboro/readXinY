import React,{Component} from 'react';


class login extends Component {
    constructor(){
        super();
        this.state = {

        }
    }
    go(event){

    }
    render(){
        return(
            <div>
            <ul>
            <li>
                <input
            type="text"
            name="user"
            className="my-4 form-control"
            placeholder="type username or email"
            />
          </li>
          <li>
          <input
            type="password"
            name="pass"
            className="my-4 form-control"
            placeholder="password"
            />
            </li>
            </ul>
            <button
          onClick={this.go}
          className=" btn-info mb-3 form-control" >
          LOGIN
          </button>
            </div>
        );
    }
}

export default login;
