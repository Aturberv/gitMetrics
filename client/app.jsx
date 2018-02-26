import Header from './header/header.jsx';
import RepoList from './RepoList/RepoList.jsx'
import React, { Component } from 'react';
import ReactDom from "react-dom";
import { Grid } from 'react-bootstrap';
import Routes from './Routes.jsx';
import axios from 'axios';

// import {
//   Route,
//   NavLink,
//   HashRouter
// } from "react-router-dom";


// import RepoList from "../RepoList/RepoList.jsx";
import RepoDetails from "./RepoDetails/Details.jsx";


class App extends Component {
	constructor(props) {
    super(props);

    this.state = {
      repos: [],
      currentRepo: null
    };

    this.getCurrentRepo = this.getCurrentRepo.bind(this)
  }

  componentDidMount() {
    fetch("http://localhost:8081/getRepos")
    .then(res => res.json())
    .then(repos => {
			// console.log(repos); 
			this.setState({ repos });
		})
    // .then(res => {console.log(this.state)})
  }

  getTest(){
    axios({
      method: 'get',
      url: 'http://localhost:8081/login',
      // headers: {'Access-Control-Allow-Origin': 'http://localhost:8081/'}
  })
    .then(function(response){
      console.log('response')
      console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
  }

  getCurrentRepo(curr) {
    console.log(curr)
    this.setState({currentRepo: curr})
  }

  render() {
    return (
      <div>
        {
          this.state.currentRepo ?
            <div>
              <Header />
              <RepoDetails details={this.state.currentRepo} />
            </div>
            :
            <div>
              <Header />
              <Grid id="content">
                <RepoList currentRepo={this.getCurrentRepo} repos={this.state.repos} />
              </Grid>
            </div>
        }
        </div>
      );
  }
}




export default App;



// if (this.state.page == 'home'){
//           return (
//             <div>

//             <Header />
//             <Grid id="content">
//               <RepoList repos={this.state.repos} />
//             </Grid>
//             </div>
//             );
//         }

//         return (
//           <div>
//            <Header />
//             <RepoDetails />
//           </div>
//         );


//    }
