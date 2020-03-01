import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

let data;
class Login extends Component {
  constructor(props) {
    super(props);
    let isLogin = false;
    this.state = {
      username: '',
      password: '',
      id: '',
      isLogin
    }


    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.addUser = this.addUser.bind(this);
  }
  onChangeName(event) {
    this.setState({
      username: event.target.value,
    });

  }
  onChangePassword(event) {
    this.setState({
      password: event.target.value
    });

  }
  handleSubmit(event) {
    event.preventDefault();

    let body = {
      name: this.state.username,
      password: this.state.password

    }
    console.log(body);
    let url = "http://localhost:8080/user/login";

    axios.post(url, body).then(response => {
      if (response.data > 0) {
        console.log("başarlı giriş");
        this.setState({
          isLogin: true,
          id: response.data
        })
        console.log(this.state.id);

      } else {
        console.log("başarsız giriş");
        alert('Başarsız kullanıcı');

      }
    })


  }

  addUser(event) {
    event.preventDefault();
    let body = {
      name: this.state.username,
      password: this.state.password
    }

    let url = "http://localhost:8080/user";
    console.log(body);

    axios.post(url, body).then(response => {
      if (response.data == "Save success") {
        console.log("save success");

      } else {
        console.log("başarısız");
        alert('User Exists');
        this.setState({
          isLogin: false
        })

      }
    })
  }

  render() {

    const { id } = this.state
    console.log(id);

    if (this.state.isLogin == true) {
      return <Redirect to={`/user/${this.state.id}`} />
    }
    return (
      <div className="App">

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="fname">User name:</label><br />
          <input type="text" id="fname" name="fname" value={this.state.username} onChange={this.onChangeName} />
          <br />
          <label htmlFor="lname">Password:</label>
          <br />
          <input type="password" id="lname" name="lname" value={this.state.password} onChange={this.onChangePassword} />
          <br /><br />
          <input type="submit" value="Login" />

          <br /><br />
        </form>
        <button onClick={this.addUser} > Ekle</button>

      </div>
    );
  }
}

export default Login;
