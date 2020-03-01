import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

class ListUser extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params
        let url = "http://localhost:8080/user";
        axios.get(url).then(response => {
            console.log(response.data);
            this.setState({
                users: response.data
            })
            
        }).catch(err => {
            console.log(err);
        })
    }


    render() {
        return (
            <>
                <div className="App">

                        <h>Kullanıcılar</h>

                    <table>

                        <tr>
                            <th>İsim</th>
                            <th>Şifre</th>

                        </tr>
                        <tr>
                            <td>
                                {
                                    this.state.users.map(el => (
                                        <div key={el.id}>
                                            <td>{el.name}</td>

                                        </div>

                                    ))
                                }</td>
                            <tr>             {
                                this.state.users.map(el => (
                                    <div key={el.id}>

                                        <td>{el.password}</td>
                                    </div>

                                ))
                            }</tr>
                        </tr>

                    </table>
                </div>
            </>
        );
    }
}

export default ListUser;



