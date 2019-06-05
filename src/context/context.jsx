import React, {Component, createContext} from 'react';

//buat context
const Context = createContext();

//buat provider
const Provider = Context.Provider;

// High Order Component Global Provider
const GlobalProvider = (ChildrenComponent) => {
    return(

        // retrun component lagi
        class ParentComponent extends Component {

            // dibuat constructor 
            constructor(props){
                super(props);
                this.state = {
                    siteName : "Site Name",
                    siteMode : "user",
                    isLogin : false,
                    userData : {},

                }
            }

            // global dispatcher
            // untuk set dispatch wajib pakai objek dengan key type : "ACTION", data: value
            dispatch = (action) => {
                // track action apa yang di lakukan
                console.log(action.type);
                switch(action.type){
                    
                    //action login admin
                    case "ADMIN_LOGIN":
                        // untuk case Admin login data yang dikirim "user"
                        this.setState({
                            isLogin : true,
                            userData : action.data.user
                        })
                        break;
                    
                    //action logout admin
                    case "ADMIN_LOGOUT":
                        this.setState({
                            isLogin : false,
                            userData : {}
                        })
                        break;

                    default:
                        return false;
                }
            }

            // fungsi buat cek data login terakhir yang tersimpan di localStorage
            handleCheckLoginData = () => {
                // data login disimpan di properti __user
                var login_data = localStorage.getItem("__user");

                // localStorage return null saat item tidak ada,
                // localStorage store data objek harus JSON, jadi tipe datanya string
                if(login_data !== null && typeof(login_data) === "string" ){

                    //data user ditemukan harus diparse ke objek
                    var user = JSON.parse(login_data);

                    // cek objek punya key username?
                    if(user.hasOwnProperty("user_email")){

                        // ubah state menjadi login
                        this.setState({
                            isLogin : true,
                            userData : user,
                        })
                    }
                }
            }

            componentDidMount(){
                // method di panggil saat komponen hendak di pasang
                this.handleCheckLoginData();
            }

            render(){
                // set GlobalState untuk global context
                let GlobalState = {
                    RootState : this.state,
                    RootAction : this.dispatch
                }
                return(
                    <Provider value={GlobalState}>
                        <ChildrenComponent {...this.props} />
                    </Provider>
                );
            }
        }
    )
}

// konsumer untuk context
const Consumer = Context.Consumer;
export const GlobalConsumer = (ChildrenComponent) => {
    return(
        class ParentComponent extends Component {
            render(){
                return(
                    <Consumer>
                        {
                            (value) => (
                                <ChildrenComponent {...value} {...this.props} />
                            )
                        }
                    </Consumer>
                )
            }
        }
    )
}

export default GlobalProvider;