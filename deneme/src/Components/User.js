import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import './User.css'

class User extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            barcodes: [],
            barcodeSize: Number,
            userCount: Number,
            barcodeName: '',
            barcodeCode: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeCode = this.onChangeCode.bind(this);
    }
    onChangeName(event) {
        this.setState({
            barcodeName: event.target.value,
        });

    }
    onChangeCode(event) {
        this.setState({
            barcodeCode: event.target.value
        });

    }

    handleSubmit(event) {

        event.preventDefault();
        const { id } = this.props.match.params
        let body = {
            name: this.state.barcodeName,
            barcodeCode: this.state.barcodeCode,
            user: {
                id: id
            }
        }

        console.log(body);
        let url = "http://localhost:8080/barcode";

        axios.post(url, body).then(response => {
            if (response.data == "OK") {
                console.log("kayıt edildi");
                /*             this.setState({
                            isLogin: true,
                            id:response.data})
                            console.log(this.state.id); */

            }
        })

    }

    componentDidMount() {
        const { id } = this.props.match.params
        let url = "http://localhost:8080/user/getbarcodes/" + id;
        axios.get(url).then(response => {
            console.log(response.data);
            this.setState({
                barcodes: response.data
            })
        }).catch(err => {
            console.log(err);
        })

        let url2 = "http://localhost:8080/user/count";
        axios.get(url2).then(response => {
            console.log(response.data);
            this.setState({
                userCount: response.data
            })
        }).catch(err => {
            console.log(err);
        })

        let url3 = "http://localhost:8080/barcode/count";
        axios.get(url2).then(response => {
            console.log(response.data);
            this.setState({
                barcodeSize: response.data
            })
        }).catch(err => {
            console.log(err);
        })


    }

    render() {
        return (
            <>
                <div className="App">

                    <table>

                        <tr>
                            <th>Name</th>
                            <th>code</th>

                        </tr>
                        <tr>
                            <td>
                                {
                                    this.state.barcodes.map(el => (
                                        <div key={el.id}>
                                            <td>{el.name}</td>

                                        </div>

                                    ))
                                }</td>
                            <tr>             {
                                this.state.barcodes.map(el => (
                                    <div key={el.id}>

                                        <td>{el.barcodeCode}</td>
                                    </div>

                                ))
                            }</tr>
                        </tr>

                    </table>
                    <div>
                        <h2>
                            Kullanıcı sayısı: {this.state.userCount}
                        </h2>
                    </div>
                    <br />

                    <div>
                        <h2>
                            Barkod sayısı: {this.state.barcodeSize}
                        </h2>
                    </div>
                    <br /><br />
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="bname">barcode name:</label><br />
                            <input type="text" id="bname" name="bname" value={this.state.barcodeName} onChange={this.onChangeName} />
                            <br />
                            <label htmlFor="code">Barcode Code:</label>
                            <br />
                            <input type="text" id="code" name="code" value={this.state.barcodeCode} onChange={this.onChangeCode} />
                            <br /><br />
                            <input type="submit" value="Barkod Ekle" />
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default User;
