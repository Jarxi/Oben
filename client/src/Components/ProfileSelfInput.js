import React from 'react';
import '../CSS/ProfilePage.css';
import '../CSS/bootstrap/css/bootstrap-iso.css'

class ProfileSelfInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  
            language: "",
            degree:"",
            graduation:"",
            certification:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelfInputSubmit = this.handleSelfInputSubmit.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: value
        })
    }

    handleSelfInputSubmit(e){
        //TODO: Connect the editing profile for employer
        console.log('====================================');
        console.log(this.state);
        console.log('====================================');
    }

    render() {
        return (
            <div className='bootstrap-iso'>
                <div className='ProfileInfoWrapper'>
                    <div className='title'>Optional For Employee Self Input:</div>
                    <table className='table'>
                        <tbody>
                            <tr>
                            <th scope="row">Language:</th>
                            <td><input type="text" id="language" className="paymentInput" placeholder="Chinese/English/Spanish/..."
                        name="language" value={this.state.language} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Highest Degree:</th>
                            <td><input type="text" id="degree" className="paymentInput" placeholder="PHD in Accounting"
                        name="degree" value={this.state.degree} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Graduation:</th>
                            <td><input type="text" id="graduation" className="paymentInput" placeholder="YYYY/MM/DD"
                        name="graduation" value={this.state.graduation} onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                            <th scope="row">Certification</th>
                            <td><input type="text" id="certification" className="paymentInput" placeholder="CFA/CPA"
                        name="certification" value={this.state.certification} onChange={this.handleChange}/></td>
                            </tr>

                            
                        </tbody>
                    </table>
                    <button type="button" className="btn btn-success inlineButton" onClick={this.handleSelfInputSubmit}>Update</button>
                </div>
            </div>
        );
    }
}

export default ProfileSelfInput;