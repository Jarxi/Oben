import React from 'react';
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
        //TODO: Connect the payment address update for contractor
        console.log('====================================');
        console.log(this.state);
        console.log('====================================');
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
                            <td><input type="text" id="address" className="paymentInput" placeholder="Address line 1"
                        name="address" value={this.state.address} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Address2</th>
                            <td><input type="text" id="address2" className="paymentInput" placeholder="Address line 2"
                        name="address2" value={this.state.address2} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">City</th>
                            <td><input type="text" id="city" className="paymentInput" placeholder="City"
                        name="city" value={this.state.city} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">State</th>
                            <td><input type="text" id="state" className="paymentInput" placeholder="State"
                        name="state" value={this.state.state} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Zip</th>
                            <td><input type="text" id="zip" className="paymentInput" placeholder="Zip"
                        name="zip" value={this.state.zip} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Rate Information</th>
                            <td><input type="text" id="rate" className="paymentInput" placeholder="Rate"
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