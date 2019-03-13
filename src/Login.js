import React, { Component } from 'react';

import { HashRouter as Router, Route, Link } from "react-router-dom";


export class Login extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center">Welcome</h1>
                <div className="text-center form-inline">
                    <form>
                        <label>
                            Username:
                  <input type="text" name="name" />
                        </label>
                        <br></br>
                        <label>
                            Password:
                  <input type="password" name="password" />
                        </label>
                        <br></br>
                        <Link to ={"/home"} className="btn btn-primary">Submit</Link>
                    </form>
                </div>
            </div>
        )
    }
}