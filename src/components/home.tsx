import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as LoginStore from '../store/login';
import Search from './search';


type Props =
    LoginStore.UserAuth &    
    typeof LoginStore.actionCreators &   
    RouteComponentProps<{}>;
interface state {
    username:string ;
    password:string ;
    
}


class Home extends React.Component<Props,state> {

    constructor(props:Props)
    {
        super(props)
        this.state={
            password:'',
            username:'' 
        }
    }

    UsernameUpdate =(e:any)=>{
        this.setState({
            username :e.target.value
        })
    }

    PasswordUpdate =(e:any)=>{
        this.setState({
            password :e.target.value
        })
    }

    LogIn=()=>{      
        this.props.login(this.state.username,this.state.password)
    }

    LogOut=()=>{
        this.props.logout()
    }

    
    public render() {      
        return (
            <React.Fragment>
               {this.props.isAuthenticated?(
                   <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <span className="navbar-brand">Starwar Planets Search</span> 
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto"> 
                        <li className="nav-item">
                            <button className="btn btn-outline-danger my-2 my-sm-0" onClick={this.LogOut} >Log out</button>
                        </li>
                        </ul>
                    </div>
                    </nav>
                    <Search  />
                    </div>
                   
               ):(

        <div className="wrapper fadeInDown">
            <div id="formContent"> 
                <div>
                <input type="text"  
                       placeholder="Username" 
                       className="fadeIn second"
                       value={this.state.username}
                       onChange={(e)=>this.UsernameUpdate(e)} />
                 <input 
                     type="password" 
                     placeholder="Password" 
                     className="fadeIn third"
                     value={this.state.password}
                     onChange={(e)=>this.PasswordUpdate(e)}
                     />
                 <button type="button"
                    className="fadeIn fourth submmit"
                    onClick={  this.LogIn }>
                    Sign In
                </button> 
                
                </div>
                </div>
            </div>
              )}
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.login,    
    LoginStore.actionCreators
)(Home as any);
