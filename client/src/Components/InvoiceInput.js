import React from 'react';
import axios from 'axios';

class InvoiceInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileUpload: null,
            encoded_filename: null,
            message: ""
        };
        this.handleFileSubmit = this.handleFileSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleDownload = this.handleDownload.bind(this);
    }
    handleFileSubmit(){
        const configpost = {
            headers:{            
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };
        const param = new FormData();
        param.append('file', this.state.fileUpload)
        let fname = this.state.fileUpload.name;
        let url = "http://localhost:3000/api/file/upload"
        axios.post(url,param,configpost).then((res)=>{
            console.log(res)
            if(res.status === 200){
                alert("Succeeded in Uploading files!")
                this.setState({
                    message: this.state.message + fname + "✅",
                    encoded_filename: res.data.filename,
                })
            }
            }
    
        ).catch((e)=>{
            console.log(e)
            console.log("Upload files failed")
        })
    }

    handleFileChange(e){
        this.setState({
            fileUpload: e.target.files[0],
        });
    }

    handleDownload(){
        console.log(11111111)
        const config = {
            headers:{            
                authorization: "Bearer " + sessionStorage.getItem('token')
            }
        };
        const param = {
            filename: this.state.encoded_filename
        }
        axios.get("http://localhost:3000/api/download",param, config)
        .then(
            (res) => {
                console.log(res)
                // this.setState({
                //     isLoaded: true,
                //     projects: res.data.projects
                // });
            },
            (error) => {
                console.log(error)
                });
    }
    render() {
        return (
            <div className='outer_box'>
            <p className='title'>Invoice Input</p>
            <div className='submissionSection bootstrap-iso'>
              <form className='form-inline'>
                <div className='form-group row col-sm-6'>
                  <label htmlFor='month' className='col-sm-3 col-form-label '>
                    Month
                  </label>
                  <div className='col-sm-3'>
                    <input
                      type='text'
                      className='form-control small-input'
                      id='month'
                    />
                  </div>
                </div>
                <div className='form-group row col-sm-6'>
                  <label
                    htmlFor='invoice_no'
                    className='col-sm-4 col-form-label'
                  >
                    Invoice Number
                  </label>
                  <div className='col-sm-2'>
                    <input
                      type='text'
                      className='form-control small-input'
                      id='invoice_no'
                    />
                  </div>
                </div>
                <div className='form-group row'>
                  <label
                    htmlFor='total_days'
                    className='col-sm-6 col-form-label'
                  >
                    Total Days in the invoice:
                  </label>
                  <input
                    type='text'
                    className='form-control col-sm-6'
                    id='total_dyas'
                  />
                </div>

                <div className='form-group row'>
                  <label
                    htmlFor='total_amount'
                    className='col-sm-6 col-form-label'
                  >
                    Total Amount Submitted:
                  </label>
                  <input
                    type='text'
                    className='form-control col-sm-6'
                    id='total_amount'
                  />
                </div>

                <div className='form-group row'>
                  <label htmlFor='service' className='col-sm-6 col-form-label'>
                    Nature of Services Provided:
                  </label>
                  <input
                    type='text'
                    className='form-control col-sm-6'
                    id='service'
                  />
                </div>

                <div className='form-group row'>
                  <label htmlFor='fileInput' className='col-sm-6 col-form-label'>
                    Attach Your Detail:
                  </label>
                  <input
                    type='file'
                    className='form-control col-sm-6'
                    name ='fileInput'
                    onChange = {this.handleFileChange}
                  />
                  <button type='button' class='btn btn-info' onClick={this.handleFileSubmit}>
                    Upload
                </button>
                </div>
              </form>
              <div className='submit_button'>
                <button type='button' class='btn btn-success'>
                  Submit
                </button>
              </div>
              <div className='error_message'>
                <a onClick={this.handleDownload}> {this.state.message}</a>
              </div>
            </div>
          </div>
        );
    }
}

export default InvoiceInput;