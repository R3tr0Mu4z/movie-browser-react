import React, { Component } from 'react';
import Movie from './Movie';

import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui-next/Grid';
class Suggestion extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            movieid : '',
            movies: [],
            moviej: {"Title":"","Year":"","Rated":"","Released":"","Runtime":"","Genre":"","Director":"","Writer":"","Actors":"","Plot":"","Language":"","Country":"","Awards":"","Poster":"","Ratings":[{"Source":"Internet Movie Database","Value":""},{"Source":"Rotten Tomatoes","Value":""},{"Source":"Metacritic","Value":""}],"Metascore":"","imdbRating":"","imdbVotes":"","imdbID":"","Type":"","DVD":"","BoxOffice":"","Production":"","Website":"","Response":"True"}
           
        }
        
    }
    
    movie() {
        const MOVIE_BASE_URL = 'http://www.omdbapi.com/';
        const MOVIE_END_URL = '&apikey=14b03674'
        let MOVIE_FETCH_URL = `${MOVIE_BASE_URL}?i=${this.state.movieid}${MOVIE_END_URL}`;
        fetch(MOVIE_FETCH_URL, {
            method: 'GET'
        })
      .then(response => response.json())
      .then(json => {
            const moviej = json;
            console.log(moviej, 'Movie from suggestion.jsx');
            this.setState({moviej});
               
        }     
       )
        
    }
    
    rmlist(event) {
        let {suggestions} = [];
    }
    render() {
        
        let  {suggestions}  = this.props;
        
        console.log(this.state.movieid, 'movieid');
       
        console.log(suggestions, 'from suggestions.JSX');
        
        
        return (
            <div>
            <Grid container spacing={8}>
                <Grid item xs={12} sm={4}>
                <List>
                    
               {suggestions.map((suggest, k) => {
                    return (
                        <div key={k} onClick={() => this.setState({movieid: suggestions[k].imdbID})}>
                        <ListItem
                            primaryText={suggestions[k].Title}
                            leftAvatar={<Avatar src={suggestions[k].Poster} />}
                            rightIcon={<CommunicationChatBubble />}
                          />
                        </div>
     
                    )
                })}
                </List>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Movie movies={this.state.moviej} />
            </Grid>
            </Grid>
            </div>
        )
       
    }
}

export default Suggestion;