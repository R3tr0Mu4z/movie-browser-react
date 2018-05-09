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
import Paper from 'material-ui-next/Paper';
import Grid from 'material-ui-next/Grid';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            fastsuggestions: [],
            movie:'',
            img: ''
           
        }
        
    }

    emptysuggestion() {
        this.setState({fastsuggestions : []});
        
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
            <Grid container spacing={24}>
                    <Grid item xs>
                    
                    </Grid>
                <Grid item xs={6}>
                    <div>  
                        <TextField placeholder="Search Movies"

                            onChange={event => {this.setState({query: event.target.value},function () {
                            this.fastsearch();})}}
                            />
                    </div>
                    <div>
                    <div onClick={() => this.emptysuggestion()}>
                    <Suggestion suggestions={this.state.fastsuggestions} />
                    </div>
                    </div>
                   </Grid>
                <Grid item xs>
                    </Grid>
                </Grid>
 
            </MuiThemeProvider>
            </div>
            
        )
    }
    
}


export default App;
