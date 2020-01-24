import React from 'react';
import axios from 'axios';
import '../CSS/ProfilePage.css';
import '../CSS/bootstrap/css/bootstrap-iso.css'
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { log } from 'util';

class PaymentAddress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            method: "check",
            address: "",
            address2:"",
            city:"",
            state:"",
            zip:"",
            rate:"",
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handlePaymentSubmit = this.handlePaymentSubmit.bind(this);
    }

    componentDidMount(){
        const config = {
            headers:{
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };
        const url = process.env.REACT_APP_API_ENDPOINT + '/api/user';
        axios.get(url,config)
        .then(
            (res) => {
                let user = res.data.user[0];
                if(typeof user.payment =='undefined'){
                    return
                }

                this.setState({
                    method: user.payment.method,
                    address: user.payment.address,
                    address2: user.payment.address2,
                    city: user.payment.city,
                    state: user.payment.state,
                    zip: user.payment.zip,
                    rate: user.payment.rate
                });

            },
            (error) => {
                console.log(error);
            }
        )
    }

    handleSelect(value){
         this.setState({method: value});
    }

    handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: value
        })
    }

    handlePaymentSubmit(e){
        const temp = {
            method: this.state.method,
            address: this.state.address,
            address2: this.state.address2,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
            rate: this.state.rate,
        };
        const param = {
            payment: temp,
        }

        const configpost = {
            headers:{
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };

        const url = process.env.REACT_APP_API_ENDPOINT + "/api/user/userInfo";
        axios.put(url,param,configpost).then((res)=>{
            if(res.status === 200){
                alert("Succeed in Payment info")
            }
            }

        ).catch((e)=>{
            console.log(e)
            console.log("Update Payment failed")
        })
    }
    render() {
        return (
            <div className='bootstrap-iso'>
                <div className='ProfileInfoWrapper'>
                    <div className='title'>Payment Address:</div>
                    <table className='table'>
                        <tbody>
                            <tr>
                            <th scope="row">Method</th>
                            <td><RadioGroup value={this.state.method} onChange={ this.handleSelect } horizontal>
                                <RadioButton value="check">
                                    Check
                                </RadioButton>
                                <RadioButton value="ACH">
                                    ACH
                                </RadioButton>
                            </RadioGroup></td>
                            </tr>
                            <tr>
                            <th scope="row">Address</th>
                            <td><input type="text" id="address" className="paymentInput" placeholder={typeof this.state.address =="undefined"?"Address line 1":this.state.address}
                        name="address" value={this.state.address} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Address2</th>
                            <td><input type="text" id="address2" className="paymentInput" placeholder={typeof this.state.address2 =="undefined"?"Address line 2":this.state.address2}
                        name="address2" value={this.state.address2} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">City</th>
                            <td><input type="text" id="city" className="paymentInput" placeholder={typeof this.state.city =="undefined"?"City":this.state.city}
                        name="city" value={this.state.city} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">State</th>
                            <td><input type="text" id="state" className="paymentInput" placeholder={typeof this.state.state =="undefined"?"State":this.state.state}
                        name="state" value={this.state.state} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Zip</th>
                            <td><input type="text" id="zip" className="paymentInput" placeholder={typeof this.state.zip =="undefined"?"Zip":this.state.zip}
                        name="zip" value={this.state.zip} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Rate Information</th>
                            <td><input type="text" id="rate" className="paymentInput" placeholder={typeof this.state.rate =="undefined"?"Rate Info":this.state.rate}
                        name="rate" value={this.state.rate} onChange={this.handleChange}/></td>
                            </tr>


                        </tbody>
                    </table>
                    <button type="button" className="btn btn-success inlineButton" onClick={this.handlePaymentSubmit}>Update</button>
                </div>
            </div>
        );
    }
}

export default PaymentAddress;
