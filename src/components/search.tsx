import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import * as  Store from '../store/search';


type Props =
    Store.Search & 
    typeof Store.actionCreators & 
    RouteComponentProps<{}>;
interface state {
    searchText:string ;
    seletedplanets:Store.Result|null;
}


class Search extends React.Component<Props,state> {

    constructor(props:Props)
    {
        super(props)
        this.state={
            searchText:'',
                seletedplanets:null,
        }
    }

    Search =(e:any)=>{
        this.setState({
            searchText :e.target.value
        })
        this.props.GetSearch(e.target.value)
    }

    SelectPlanet=(x:Store.Result)=>{
        this.setState({seletedplanets:x})
    }
    
    public render() {      
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <div className="search-box">
                                <div className="basic-search">
                                    <div className="input-field">
                                    <input id="search" type="text" 
                                           placeholder="Type Keywords" 
                                           value={this.state.searchText} 
                                           onChange={(e)=>this.Search(e)}  />
                                    {/* <div className="icon-wrap">
                                        <svg className="svg-inline--fa fa-search fa-w-16" fill="#ccc" aria-hidden="true" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                                        </svg>
                                    </div> */}
                                    </div>
                                </div>
                                <div className="row mt-3">
                                    <div className="col">
                                        <div className="list-type1">
                                            <ol>
                                                
                                                    {this.props.results.map((x)=>
                                                       {
                                                            let Value :number = parseInt(x.population) / 100000;
                                                            let Size:number=15;
                                                            
                                                            if(!isNaN(Value))
                                                            {
                                                                if(Value>=10000000)
                                                                {
                                                                    Size=30;
                                                                }
                                                                else if(Value>=1000000)
                                                                {
                                                                    Size=25;
                                                                }
                                                                else if(Value>=100000)
                                                                {
                                                                    Size=20;
                                                                }
                                                                else if(Value>=10000)
                                                                {
                                                                    Size=18;
                                                                }
                                                                else if(Value>=1000)
                                                                {
                                                                    Size=16;
                                                                }
                                                                else if(Value>=100)
                                                                {
                                                                    Size=15;
                                                                }
                                                            } 
                                                            let Style ={
                                                                fontSize:`${Size}px`
                                                            }

                                                           return (
                                                            <li key={x.name} onClick={ ()=> this.SelectPlanet(x)}>
                                                            <div   style={Style}>
                                                             {x.name } </div>
                                                            </li>
                                                           )
                                                       }
                                                    )}
                                            </ol>
                                        </div>
                                    </div>
                                    <div className="col">
                                    <div>
                                            {this.state.seletedplanets!=null?(
                                                <div className="col-8">
                                                    <table className="table table-dark table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <td colSpan={2}> <h1> {this.state.seletedplanets.name} </h1></td>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>Rotation Period</td>
                                                                <td> {this.state.seletedplanets.rotation_period} </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Orbital Period</td>
                                                                <td>{this.state.seletedplanets.orbital_period}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Diameter</td>
                                                                <td>{this.state.seletedplanets.diameter}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Climate</td>
                                                                <td>{this.state.seletedplanets.climate}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Gravity</td>
                                                                <td>{this.state.seletedplanets.gravity}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Terrain</td>
                                                                <td>{this.state.seletedplanets.terrain}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Surface Water</td>
                                                                <td>{this.state.seletedplanets.surface_water}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Population</td>
                                                                <td>{this.state.seletedplanets.population}</td>
                                                            </tr>
                                                            {/* <tr>
                                                                <td>Residents</td>
                                                                <td>{this.state.seletedplanets.residents}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Films</td>
                                                                <td>{this.state.seletedplanets.films.map((film,index)=>(
                                                                    <span key={index}>{ film} </span>
                                                                ))}</td>
                                                            </tr> */}
                                                                

                                                        </tbody>
                                                    </table> 
                                                </div> 
                                            ):(null)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </React.Fragment>
        );
    }
};

export default connect(
    (state: ApplicationState) => state.search,    
    Store.actionCreators
)(Search as any);
