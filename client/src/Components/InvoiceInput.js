import React from 'react';
import axios from 'axios';

class InvoiceInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUpload: null,
      encoded_filename: null,
      message: '',
      month: '',
      invoice_no: '',
      service: '',
      total_days: '',
      total_amount: ''
    };
    this.handleFileSubmit = this.handleFileSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInvoiceSubmit = this.handleInvoiceSubmit.bind(this);
  }

  handleInvoiceSubmit() {
    const param = {
      month: this.state.month,
      total_days: parseInt(this.state.total_days, 10),
      total_amount: parseInt(this.state.total_amount, 10),
      service: this.state.service,
      attached_encoded_filename: this.state.encoded_filename,
      attached_filename: this.state.fileUpload.name,
      type: 'invoice',
      submitter: sessionStorage.getItem('user_id')
    };
    const configpost = {
      headers: {
        authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    let url = 'http://localhost:3000/api/submission/submit';
    axios
      .post(url, param, configpost)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          alert('Succeeded in submitting Invoice!');
          window.location.reload();
        }
      })
      .catch(e => {
        console.log(e);
        console.log('Upload invoices failed');
      });
  }
  handleFileSubmit() {
    const configpost = {
      headers: {
        authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    const param = new FormData();
    param.append('file', this.state.fileUpload);
    let fname = this.state.fileUpload.name;
    let url = 'http://localhost:3000/api/file/upload';
    axios
      .post(url, param, configpost)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          alert('Succeeded in Uploading files!');
          this.setState({
            message: this.state.message + fname + '✅',
            encoded_filename: res.data.filename
          });
        }
      })
      .catch(e => {
        console.log(e);
        console.log('Upload files failed');
      });
  }

  handleFileChange(e) {
    this.setState({
      fileUpload: e.target.files[0]
    });
  }

  handleChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  handleDownload() {
    // console.log(11111111)
    const config = {
      headers: {
        authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    const param = {
      filename: this.state.encoded_filename
    };
    console.log(param);
    axios({
      url: 'http://localhost:3000/api/download',
      method: 'GET',
      responseType: 'blob',
      params: param
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
    });
  }
  render() {
    return (
      <div className='outer_box'>
        <p className='title'>Invoice Input</p>
        <div className='submissionSection bootstrap-iso'>
          <form className='form-inline'>
            <div className='header align'>
              <div>
                <div>
                  <label htmlFor='month' className='small_label form-label '>
                    Month
                  </label>
                  <input
                    type='text'
                    className='form-control small-input '
                    id='month'
                    onChange={this.handleChange}
                    name='month'
                    value={this.state.month}
                  />
                </div>
              </div>
              <div>
                <div className='form-group'>
                  <label
                    htmlFor='invoice_no'
                    className='small_label form-label'
                  >
                    Invoice Number
                  </label>
                  <input
                    type='text'
                    className='form-control small-input'
                    id='invoice_no'
                    onChange={this.handleChange}
                    name='invoice_no'
                    value={this.state.invoice_no}
                  />
                </div>
              </div>
            </div>
            <div className='header align'>
              <div>
                <label htmlFor='total_days' className='form-label'>
                  Total Days in the invoice:
                </label>
              </div>
              <input
                type='text'
                className='form-control'
                id='total_dyas'
                onChange={this.handleChange}
                name='total_days'
                value={this.state.total_days}
              />
            </div>

            <div className='header align'>
              <div>
                <label htmlFor='total_amount' className='form-label'>
                  Total Amount Submitted:
                </label>
              </div>
              <input
                type='text'
                className='form-control'
                id='total_amount'
                onChange={this.handleChange}
                name='total_amount'
                value={this.state.total_amount}
              />
            </div>

            <div className='header align'>
              <div>
                <label htmlFor='service' className='form-label'>
                  Nature of Services Provided:
                </label>
              </div>
              <input
                type='text'
                className='form-control '
                id='service'
                onChange={this.handleChange}
                name='service'
                value={this.state.service}
              />
            </div>
            <div className='header align'>
              <div>
                <label htmlFor='fileInput'>Attach Your Detail:</label>
              </div>
              <div>
                <input
                  type='file'
                  className='form-control'
                  name='fileInput'
                  onChange={this.handleFileChange}
                />
              </div>
              <div>
                <button
                  type='button'
                  class='btn btn-info'
                  onClick={this.handleFileSubmit}
                >
                  Upload
                </button>
              </div>
            </div>
          </form>

          <div className='header align'>
            <div className='error_message'>
              <a onClick={this.handleDownload}> {this.state.message}</a>
            </div>
            <div>
              <button
                type='button'
                class='btn btn-success'
                onClick={this.handleInvoiceSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvoiceInput;
