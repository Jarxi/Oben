import React from 'react';
import '../CSS/InviteForm.css';
import generator from 'generate-password'
import axios from 'axios'

class InviteForm extends React.Component {
    constructor(){
        super()

        this.state = {
            name: '',
            email: '',
            password: generator.generate(),
            type: 'employee'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        let name = e.target.name;
        this.setState({
            [name]: value
        })
    }

    handleSubmit(e){
        e.preventDefault();
        const url = "http://localhost:3000/api/user/signup";
        console.log(this.state.email)
        const params = {
            email: this.state.username,
            password: this.state.password,
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            user_type: "aic"
        }
        axios.post(url, params).then((res)=>{
            if(res.status === 200){
                this.setState({
                    success:true
                })
                setTimeout(()=>{
                    this.props.history.push("/");
                }, 1000)
                
            }
        }).catch((err)=>{
            console.log("failed")
        })
        
    }

    render(){

        return (
            <div className="Invite_Form_Container">
                
                <form className="Single_Invite_Box" onSubmit={this.handleSubmit}>
                    <div className="Heading">Individual Invite</div>
                    <div className="Form_Row">
                        <label className="Form_Label">Name:</label>
                        <input type="text" id="name" className="Field__Input" placeholder="Name" 
                        name="name" value={this.state.name} onChange={this.handleChange}/>
                    </div>

                    <div className="Form_Row">
                        <label className="Form_Label">Email:</label>
                        <input type="text" id="email" className="Field__Input" placeholder="Email" 
                        name="email" value={this.state.email} onChange={this.handleChange}/>
                    </div>

                    <div className="Form_Row">
                        <label className="Form_Label">Temp Password:</label>
                        <input type="text" id="password" className="Field__Input" 
                        name="password" value={this.state.password} onChange={this.handleChange}/>
                    </div>

                    <div className="Type_Row">
                        <input className="square-radio" type="radio" name="employee"/><label className="Type_Label">Employee</label>
                        <label className="blank">blankblank</label>
                        <input className="square-radio" type="radio" name="contractor"/><label className="Type_Label">Contractor</label>
                    </div>
                    
                    <div className="FormField">
                        <button className="Form__Button">Invite</button>
                    </div>
                
                </form>
            </div>
        );
    }
};

export default InviteForm;