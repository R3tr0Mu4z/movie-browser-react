import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Divider from 'material-ui/Divider';
import { connect } from 'react-redux';
import { addWatchlist, deleteWatchlist, clearWatchlists } from './actions';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui-next/Paper';
import Grid from 'material-ui-next/Grid';
import Dialog from 'material-ui/Dialog';

class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            movies: [],
            open: false
           
        }
        
    }
handleToggle = () => this.setState({open: !this.state.open});
click(movies) {
    this.setState({query: movies.Title});
    addWatchlist();
}
    
addWatchlist() {
    this.props.addWatchlist(this.state.query);
  }
    renderWatchlists() {
    const { watchlists } = this.props;
    console.log(watchlists, 'WATCHLISTS');
    return (
        <Drawer open={this.state.open} width={400}>
        {
          watchlists.map(watchlist => {
            return (
              <MenuItem key={watchlist.id} className="list-group-item">
          
                  {watchlist.query}
            
                
              </MenuItem>
            )
          })
        }
      </Drawer>
    )
  }

    render() {
        const {movies}  = this.props;
        console.log({movies});
        if (movies.Title !== ""){
        return (
         
            <div onMouseOver={() => this.setState({query: movies.Title})}>
               
            <Card>
               
                <CardTitle title={movies.Title} subtitle={movies.Year} />
                <Grid container spacing={0}>
                   
                <Grid item xs={6}>
                  <img src={movies.Poster} alt="" />
                </Grid>
                    <Grid item xs>
                            <CardText>
                  {movies.Plot}
                                
                </CardText>
                        
                        <Grid container spacing={0}>
                <Grid item xs>
                <CardText><b>IMDB: </b>{movies.Ratings[0].Value}</CardText>
                </Grid>
            
                <Grid item xs>
                        <CardText><b>Metascore: </b>{movies.Metascore}</CardText>
                </Grid>
              </Grid>
                        <Grid container spacing={0}>
                <Grid item xs>
                <CardText><b>BoxOffice: </b>{movies.BoxOffice}</CardText>
                </Grid>
       
                <Grid item xs>
                        <CardText><b>Awards: </b>{movies.Awards}</CardText>
                </Grid>
              </Grid>
                        <Grid container spacing={0}>
                <Grid item xs>
                <CardText><b>Director: </b>{movies.Director}</CardText>
                </Grid>
       
                <Grid item xs>
                        <CardText><b>Writers: </b>{movies.Writer}</CardText>
                </Grid>
              </Grid>
                <Grid container spacing={0}>
                <Grid item xs>
                <CardText><b>Genre: </b>{movies.Genre}</CardText>
                </Grid>
       
                <Grid item xs>
                        <CardText><b>Rated: </b>{movies.Rated}</CardText>
                </Grid>
              </Grid>
                    </Grid>
                </Grid>       
                <CardActions>
                    <Grid container spacing={0}>
                    <Grid item xs>
                    
                    </Grid>
                <Grid item xs={6}>
               
                </Grid>
                    <Grid item xs>
                
                    </Grid>
                </Grid>
                  <RaisedButton primary={true}  label="Add to Watchlist" onClick={() => this.addWatchlist()}/>    
                 <RaisedButton
                    secondary={true}
                  label="Show Watchlist"
                  onClick={this.handleToggle}
                />
                   <div>
            {this.renderWatchlists()}

          </div> 
                </CardActions>
            </Card>
    
           
            </div>
                
              
            
        )
    }
        else return (
            <div></div>
        )
    }
}
function mapStateToProps(state) {
    console.log(state,'state');
  return {
    
    watchlists: state
  }
}

export default connect(mapStateToProps, { addWatchlist })(Movie);
