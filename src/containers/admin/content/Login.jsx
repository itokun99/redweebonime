import React, {Component} from 'react';
import {GlobalConsumer} from '../../../context/context';
import API from '../../../services/RootService';
import Alert from '../../../components/Alert';

const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Login extends Component {
    // set state login
    constructor(props){
        super(props)
        this.state = {
            loginData : {
                user_email : "",
                user_password : "",
            },
            registerData  : {
                user_name : "",
                user_email : "",
                user_password : "",
                user_verify_password : ""
            },
            successLogin : false,
            formLogin : true,
            showAlert : false,
            alertData : {
                type : "",
                message : "",
            }
        }
    }

    // method untuk mengontrol input
    handleLoginChangeText = (input) => {
        // detect name dari atribut yang ada di input misalnya dengan "name"
        let name = input.target.name
        if(name === "user_email"){
            // render value dari atribute "value"
            let prevState = {...this.state.loginData}
            prevState.user_email = input.target.value

            this.setState({
                loginData : prevState 
            })
        } else {
            let prevState = {...this.state.loginData}
            prevState.user_password = input.target.value

            this.setState({
                loginData : prevState
            })
        }
    }

    //method untuk mengontrol input di register
    handleRegisterChangeText = (input) => {
        let name = input.target.name
        let prevState = {...this.state.registerData}

        switch(name){
            case "user_name":
                prevState.user_name = input.target.value;
                break;
            
            case "user_email":
                prevState.user_email = input.target.value;
                break;
            
            case "user_password":
                prevState.user_password = input.target.value;
                break;

            case "user_verify_password":
                prevState.user_verify_password = input.target.value;
                break;

            default:
                return false;
        }

        this.setState({
            registerData : prevState
        })
    }

    // handle untuk tombol submit login
    handleLoginButton = () => {
        let data = {...this.state.loginData}

        if(data.user_email === "" || data.user_password === ""){
            alert("Lengkapi Formulir dengan benar")
        } else {
            API.loginAdmin(data).then((response) => {
                if(response.status){
                    this.setState({
                        showAlert : true,
                        alertData : {
                            type : "success",
                            message : response.pesan
                        }
                    }, () => {
                        var user = response.data
                        var action = {
                            type : "ADMIN_LOGIN",
                            data : {
                                user : user
                            }
                        }
                        localStorage.__user = JSON.stringify(user)
                        this.props.RootAction(action);
                    })
                    
                } else {
                    console.log(response);
                    this.setState({
                        showAlert : true,
                        alertData : {
                            type : "warning",
                            message : response.pesan
                        }
                    })
                }
            })            
        }
    }

    handleRegisterButton = () => {
        let data = {...this.state.registerData}
        
        if(data.user_name === "" || data.user_email === "" || data.user_password === ""){
            alert("Mohon Lengkapi Formulir!");
        } else {
            if(data.user_password !== data.user_verify_password){
                alert("Verifikasi password dengan benar!");
            } else {
                if(email_regex.test(data.user_email) === false){
                    alert("Email tidak Valid!")
                } else {
                    API.createAdmin(data).then((response) => {
                        if(response.status){
                            alert(response.pesan)
                            this.setState({
                                formLogin : !this.state.formLogin
                            })
                        } else {
                            console.log(response);
                            alert(response.pesan);
                        }
                    })
                }
            }
        }
    }



    handleChangeForm = () => {
        this.setState({
            formLogin : !this.state.formLogin,
            showAlert : false
        })
    }

    // login form
    LoginForm = () => {
        return(
            <>
                <div className="panel-login-card-header">
                    <h4 className="panel-login-card-title text-center">Login Kontributor</h4>
                </div>
                <div className="panel-login-card-body">
                    <div className="panel-login-form">
                        {this.state.showAlert ?
                            <Alert type={this.state.alertData.type} message={this.state.alertData.message} style={{textAlign : "center"}} />
                        :"" }
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input onChange={(e) => this.handleLoginChangeText(e)} type="email" id="user_email" name="user_email" className="form-control" placeholder="Your@email.com" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input onChange={(e) => this.handleLoginChangeText(e)} type="password" id="user_password" name="user_password" className="form-control" placeholder="******" />
                        </div>
                        <div className="form-group m-0">
                            <button onClick={this.handleLoginButton} type="button" id="subminLogin" className="btn btn-primary btn-block">Login</button>
                        </div>
                    </div>
                </div>
                <div className="panel-login-card-footer">
                    <div className="panel-login-action text-center font-small">
                        <span>Ingin Gabung? klik <span onClick={this.handleChangeForm} style={{color:"#ff6b6b", cursor : "pointer"}}>disini!</span></span>
                    </div>
                </div>
            </>
        )
    }
    
    // registration
    RegistrationForm = () => {
        return(
            <>
                <div className="panel-login-card-header">
                    <h4 className="panel-login-card-title text-center">Daftar Anggota</h4>
                </div>
                <div className="panel-login-card-body">
                    <div className="panel-login-form">
                        <div className="form-group">
                            <label className="form-label">Nama Lengkap</label>
                            <input onChange={(e) => {this.handleRegisterChangeText(e)}} type="text" id="user_name" name="user_name" className="form-control" placeholder="Indrawan Lisanto" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input onChange={(e) => {this.handleRegisterChangeText(e)}} type="email" id="user_email" name="user_email" className="form-control" placeholder="Your@email.com" />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input onChange={(e) => {this.handleRegisterChangeText(e)}} type="password" id="user_password" name="user_password" className={`form-control ${this.state.registerData.user_password !== this.state.registerData.user_verify_password ? "invalid" : ""}`} placeholder="******" />
                            <div className="invalid-feedback">password not match</div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Verify Password</label>
                            <input onChange={(e) => {this.handleRegisterChangeText(e)}} type="password" id="user_verify_password" name="user_verify_password" className={`form-control ${this.state.registerData.user_password !== this.state.registerData.user_verify_password ? "invalid" : ""}`} placeholder="******" />
                            <div className="invalid-feedback">password not match</div>
                        </div>
                        <div className="form-group m-0">
                            <button onClick={this.handleRegisterButton} type="button" id="subminLogin" className="btn btn-primary btn-block">Register</button>
                        </div>
                    </div>
                </div>
                <div className="panel-login-card-footer">
                    <div className="panel-login-action text-center font-small">
                        <span>Sudah punya akun? login <span onClick={this.handleChangeForm} style={{color:"#ff6b6b", cursor : "pointer"}}>disini!</span></span>
                    </div>
                </div>
            </>
        )
    }

    componentDidMount(){
        
    }

    test = () => {

    }
    
    render(){
        return(
            <div id="loginSection" className="panel-login">
                <div className="panel-login-card">
                    {
                        this.state.formLogin ? <this.LoginForm/> : <this.RegistrationForm/>}
                </div>
            </div>
        )
    }
}

export default GlobalConsumer(Login);