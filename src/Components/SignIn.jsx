import React, { Component } from 'react';
import AdminServices from '../Services/AdminServices'
const adminServices = new AdminServices()
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    Signin = () => {

        var data = {
            email: this.state.email,
            password: this.state.password
        }


        adminServices.Login(data).then(response => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("Name", response.data.data.firstName + " " + response.data.data.lastName)
            this.props.history.push('/home')
        }).catch(errors => {
        })
    }
    OnChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    validateForm() {
        let errors = {};
        let formIsValid = true;


        if (!this.state.email) {
            formIsValid = false;
            errors[this.state.email] = "*Please enter your email-ID.";
        }

        if (typeof this.state.email !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(this.state.email)) {
                formIsValid = false;
                errors[this.state.email] = "*Please enter valid email-ID.";
            }
        }


        if (!this.state.password) {
            formIsValid = false;
            errors[this.state.password] = "*Please enter your password.";
        }

        if (typeof this.state.password !== "undefined") {
            if (!this.state.password.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors[this.state.password] = "*Please enter secure and strong password.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;

    }
    render() {
        return (

            <div className="container">
                <div className="card col-lg-4 mx-auto" style={{ marginTop: '100px' }}>
                    <div className="card-body">
                        <h4>
                            <div style={{ fontSize: "1.6rem", padding: "1%", fontWeight: "bolder", fontFamily: "sarif", marginTop: "3%" }}>
                                <span style={{ color: "#3369E8" }}>F</span>
                                <span style={{ color: "#D50F25" }}>u</span>
                                <span style={{ color: "#EEB211" }}>n</span>
                                <span style={{ color: "#3369E8" }}>d</span>
                                <span style={{ color: "#009925" }}>o</span>
                                <span style={{ color: "#D50F25" }}>o</span>
                            </div>
                        </h4>
                        <h4 className="text-center">
                            Sign In
                    </h4>
                        <h6 className="text-center">
                            Use your Fundoo Account
                    </h6>

                        <div className="form-row">
                            <div className="form-group col-md-12">
                                <label style={{ marginRight: '93%' }}>Email</label>
                                <input name="email" value={this.state.email} type="email" className="form-control" placeholder="Email" onChange={this.OnChange} required />
                            </div>
                            <div className="form-group col-md-12">
                                <label style={{ marginRight: '93%' }}>Password</label>
                                <input name="password" value={this.state.password} type="password" className="form-control" placeholder="Password" onChange={this.OnChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="form-check text-left">
                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                <label className="form-check-label" htmlFor="gridCheck">
                                    Remember me
                                     </label>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-block" onClick={this.Signin}>Sign in</button>

                    </div>
                </div>
            </div>

        )
    }
}
export default SignIn

