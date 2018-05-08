import React, { Component } from 'react';
import Movie from './Movie';
import Suggestion from './Suggestion';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui-next/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import { connect } from 'react-redux';
import { addWatchlist, deleteWatchlist, clearWatchlists } from './actions';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            fastsuggestions: [{"Title":"Search or N/A"}],
            movie:''
           
        }
        
    }
    addWatchlist() {
    this.props.addWatchlist(this.state.query);
  }


  renderWatchlists() {
    const { watchlists } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {
          watchlists.map(watchlist => {
            return (
              <li key={watchlist.id} className="list-group-item">
                <div className="list-item">
                  <div>{watchlist.query}</div>
                </div>
                
              </li>
            )
          })
        }
      </ul>
    )
  }
    
    fastsearch(event) {
        if (this.state.query !== null){
        const BASE_URL = 'http://www.omdbapi.com/';
        const END_URL = '_&apikey=14b03674'
        let FETCH_URL = `${BASE_URL}?s=${this.state.query}${END_URL}`;
       fetch(FETCH_URL, {
           method: 'GET'
       })
      .then(response => response.json())
      .then(json => {
            let fastsuggestions =[{"Title":"","Year":"","imdbID":"","Type":"","Poster":""}];
            
           if (json.Search !== undefined){
             let fastsuggestions  = json.Search;
               console.log(fastsuggestions, 'from fastsuggestion');
            this.setState({fastsuggestions});
           } else if (json.Search == undefined) {
               let fastsuggestions = [];
               console.log(fastsuggestions, 'undefined from fastsuggestion');
           }
            
        }
       )
        }
     } 
    
    render() {
        
        return(
            <div>
            <MuiThemeProvider>
            
                <div>
                    
                      
                    <TextField placeholder="Search"
                        
                        onChange={event => {this.setState({query: event.target.value},function () {
                        this.fastsearch();})}}
                        />
                    
                    
                </div>
                <div className="Profile">
                    <div>{this.state.Title}</div>
                    
                </div>
                <div>
                    <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addWatchlist()}
          >
            Add Watchlist
          </button>
            <Suggestion suggestions={this.state.fastsuggestions} />
            </div>
            </MuiThemeProvider>
            </div>
            
        )
    }
    
}

function mapStateToProps(state) {
    console.log(state,'state');
  return {
    
    watchlists: state
  }
}

export default connect(mapStateToProps, { addWatchlist })(App);
