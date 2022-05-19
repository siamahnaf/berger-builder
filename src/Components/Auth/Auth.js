import React, { Component } from 'react';
import { Formik } from 'formik';
import { auth } from '../../Redux/AuthActionCreators';
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { Alert } from 'reactstrap';

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}
const mapStateToProps = state => {
    return {
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg
    }
}

class Auth extends Component {
    state = {
        mode: "Sign Up",
    }
    switchModeHandler = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"
        })
    }
    render() {
        let err = null;
        if (this.props.authFailedMsg !== null) {
            err = <Alert color="danger">{this.props.authFailedMsg}</Alert>
        }
        let form = null;
        if (this.props.authLoading) {
            form = <Spinner />
        } else {
            form = (
                <Formik
                    initialValues={
                        {
                            email: "",
                            password: "",
                            passwordConfirm: "",
                        }
                    }
                    onSubmit={
                        (values) => {
                            this.props.auth(values.email, values.password, this.state.mode)
                        }
                    }
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = "Invalid email addrees"
                        }
                        if (!values.password) {
                            errors.password = 'Required';
                        } else if (values.password.length < 6) {
                            errors.password = 'Must be atleast characters!'
                        }
                        if (this.state.mode === "Sign Up") {
                            if (!values.passwordConfirm) {
                                errors.passwordConfirm = "Required";

                            } else if (values.password !== values.passwordConfirm) {
                                errors.passwordConfirm = "Password does not match"
                            }
                        }
                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div
                            style={{
                                border: "1px solid grey",
                                borderRadius: "7px",
                                padding: "15px",

                            }}
                        >
                            <button style={{
                                width: "100%",
                                backgroundColor: "#D70F64",
                                color: "white"
                            }} className="btn btn-lg" onClick={this.switchModeHandler}>Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</button>
                            <br />
                            <br />
                            <form onSubmit={handleSubmit}>
                                <input
                                    name="email"
                                    placeholder="Enter your Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <p
                                    style={{
                                        color: "red",
                                        fontSize: "12px",
                                        marginBottom: "5px",
                                        marginTop: "3px"
                                    }}
                                >{errors.email}</p>
                                <br />
                                <input
                                    name="password"
                                    placeholder="Enter your Password"
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <p
                                    style={{
                                        color: "red",
                                        fontSize: "12px",
                                        marginBottom: "5px",
                                        marginTop: "3px"
                                    }}
                                >{errors.password}</p>
                                <br />
                                {this.state.mode === "Sign Up" ? <div><input
                                    name="passwordConfirm"
                                    placeholder="Confirm Password"
                                    className="form-control"
                                    value={values.passwordConfirm}
                                    onChange={handleChange}
                                />
                                    <p
                                        style={{
                                            color: "red",
                                            fontSize: "15px",
                                            marginTop: "3px",
                                        }}
                                    >{errors.passwordConfirm}</p><br /></div> : null}
                                <button type="submit" className="btn btn-success">{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                            </form>
                        </div>)}
                </Formik>
            )
        }
        return (
            <div>
                {err}
                {form}
            </div >
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);