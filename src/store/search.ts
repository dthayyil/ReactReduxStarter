import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface Result {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: Date;
    edited: Date;
    url: string;
}

export interface Search {
    isLoading:boolean;
    results: Result[];
}


interface RequestSearch {
    type: 'REQUEST_SEARCH';
   data:Search
}

interface ReceiveSearch {
    type: 'RECEIVE_SEARCH';
    data:Search
}

type KnownAction = RequestSearch | ReceiveSearch;

const emptySearch : Search = { isLoading:true,results:[] };

export const actionCreators = {
    GetSearch: (text: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState  && text !== "" ) {
            fetch(`https://swapi.co/api/planets?search=${text}`)
                .then(response => response.json() as Promise<any>)
                .then(data => {                     
                    dispatch({ type: 'RECEIVE_SEARCH', data:{isLoading:false,results:data.results } });                    
                });
             //   dispatch({ type: 'REQUEST_SEARCH', data:unloadedState });
        }
    },
     
};

export const reducer: Reducer<Search> = (state: Search | undefined, incomingAction: Action): Search => {

     
    if (state === undefined) {
        return emptySearch;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_SEARCH':
            return emptySearch;
        case 'RECEIVE_SEARCH':        
            return action.data;     
            
        default:
                return state;       
    }

};