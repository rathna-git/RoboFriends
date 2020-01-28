import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import ErrorBoundry from '../Components/ErrorBoundry';
import './App.css';
import {setSearchField, requestRobots} from '../actions';

const mapStateToProps = state => {
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component{
  // constructor(){
  //   super();
  //   this.state = {
  //     robots: [],
  //     //searchField: ''
  //   }
  // }

  componentDidMount() {
    this.props.onRequestRobots();

    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(users => this.setState({ robots: users}));
  }

  // onSearchChange = (event) =>{
  //   this.setState({searchField: event.target.value});
  // }

  render() {
    const {searchField, onSearchChange, robots, isPending} = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });

    return isPending ?
       <h1>Loading...</h1> :
       (
        <div className='tc'>
        <h1> RoboFriends</h1>
        <SearchBox searchChange={onSearchChange}/>
        <ErrorBoundry>
          <CardList robots={filteredRobots}/>
        </ErrorBoundry>
        </div>
      )
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App);
