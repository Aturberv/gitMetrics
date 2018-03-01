import Header from './header/header.jsx';
import List from './List/List.jsx'
import React, { Component } from 'react';
import ReactDom from "react-dom";
import { Grid } from 'react-bootstrap';
import Routes from './Routes.jsx';
import axios from 'axios';
import Aggregate from './Aggregate/Aggregate.jsx'
import './app.css';
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
      orgs: [],
      currentRepo: null,
			currentOrg: null
    };
		this.getCurrentRepo = this.getCurrentRepo.bind(this);
    this.getCurrentOrg = this.getCurrentOrg.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:8081/getAllInfo")
    .then(res => res.json())
    .then( orgs => {
			// console.log(repos);
			this.setState({ orgs });
		})
    // .then(res => {console.log(this.state)})
  }

  getCurrentRepo(curr) {
    this.setState({currentRepo: curr});
  }

	getCurrentOrg(curr) {
		console.log(curr);
		this.setState({currentOrg: curr});
	}

  render() {
    return (
      <div>
	      <Header />
        {
					this.state.currentRepo ?
						<RepoDetails details={this.state.currentRepo} />
					:
					(
          this.state.currentOrg ?
						<div className="rowOrg">
						  <div className="columnOrg orgleft">
						    <Aggregate orgStats={this.state.currentOrg}/>
						  </div>
						  <div className="columnOrg orgright">
								<Grid id="content">
									<List getCurrent={this.getCurrentRepo} items={this.state.currentOrg.repos} />
								</Grid>
						  </div>
						</div>
            :
            <div>
              <Grid id="content">
                <List getCurrent={this.getCurrentOrg} items={this.state.orgs} />
              </Grid>
            </div>
					)
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
