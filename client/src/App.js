import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import './App.css';
import TableList from './TableList';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ModalForm from './ModalForm';
import { API_VIDEO } from './config';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: '50px',
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  grid: {
    position: 'relative'
  },
  fab: {
    position: 'absolute',
    right: '10px',
    bottom: ' -50px'
  }
});

class App extends Component {

  state = {
    open: false,
    countItems: 0,
    listVideos: [],
    itemVideo:{id:null, embeds:[]}
  };

  componentDidMount() {
    this.fetchItems();
  }

  handleOpen = () => {
    this.setState({ open: true, itemVideo: {id:null, embeds:[]} });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  updateList = () => {
    this.fetchItems();
  }

  updateItem = (item) => {
    console.log(item);
    this.setState({open:true, itemVideo:item});
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} item xs={8}>
          <TableList updateItem={this.updateItem} items={this.state.listVideos} />
          <p> Items {this.state.countItems} </p>
          <Button onClick={this.handleOpen} variant="fab" className={classes.fab} color='primary'>
              <AddIcon />
          </Button> 
          <ModalForm itemVideo={this.state.itemVideo} updateList={this.updateList} open={this.state.open} handleClose={this.handleClose} />
        </Grid>
      </div>
    );
  }

  fetchItems() {
    fetch(API_VIDEO)
    .then(res=>res.json())
    .then(json=>{
        this.setState({listVideos: json.data, countItems:json.data.length});
    })
    .catch(err=>{
        console.log('err', err);
    })
}

}

export default withStyles(styles)(App);
