import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import { toast } from 'react-toastify';

export interface UserAuth {
 isAuthenticated: boolean;
   user:User;
}

export interface User {
   userName:string;
   password:string;
}

interface RequestLogin {
    type: 'REQUEST_LOGIN';
   data:UserAuth
}

interface ReceiveLogin {
    type: 'RECEIVE_LOGIN';
    data:UserAuth

}

type KnownAction = RequestLogin | ReceiveLogin;

export const actionCreators = {
    login: (username: string,password:string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.login?.isAuthenticated===false && username !== "" && password!=="") {
            toast.info("Please wait.")       
            fetch(`https://swapi.co/api/people/?search=${username}`)
                .then(response => response.json() as Promise<any>)
                .then(data => {
                    
                    let Present :boolean =false;
                    for (var i = 0; i <  data.results.length; ++i) {
                        let element = data.results[i];
                       
                        if(element.name===username&&element.birth_year ===password)
                        {
                            Present= true;
                            break;
                        }
                    }
                    if(Present)
                    {
                        dispatch({ type: 'RECEIVE_LOGIN',
                                  data:{isAuthenticated :true, 
                                        user:{password:password,userName:username }
                                       }
                                });        
                    }
                    else{
                        toast.error("Username or Password invalid")       
                    }          
                });

                dispatch({ type: 'REQUEST_LOGIN', data:unloadedState });
        }
        else
        {
            toast.error("Please enter Username or Password")
        }
    },
    logout:():AppThunkAction<KnownAction>=>(dispatch)=>{
        dispatch({ type: 'REQUEST_LOGIN', data:unloadedState });
    }
};


const unloadedState: UserAuth = { user:{userName :"",password:""},isAuthenticated:false };

export const reducer: Reducer<UserAuth> = (state: UserAuth | undefined, incomingAction: Action): UserAuth => {

   
     
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
            isAuthenticated:false,
            user: { password:"",userName:""}
            };
        case 'RECEIVE_LOGIN':        
            return action.data;     
            
        default:
                return state;       
    }

};
