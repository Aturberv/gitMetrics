import Header from './header/header.jsx';
import List from './List/List.jsx'
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
      orgs: [],
      currentRepo: null,
			currentOrg: null
    };

    this.getCurrentOrganization = this.getCurrentOrganization.bind(this)
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
    console.log(curr)
    this.setState({currentRepo: curr});
  }

	getCurrentOrg(curr) {
		this.setState({currentOrg: curr});
	}

  render() {
    return (
      <div>
        {
					this.state.currentRepo ?
						<RepoDetails details={this.state.currentRepo} />
					:
					(
          this.state.currentOrg ?
            <div>
              <Header />
							<Aggregate />
								<Grid id="content">
	                <List getCurrent={this.getCurrentRepo} items={this.state.currentOrg.repo} />
	              </Grid>
            </div>
            :
            <div>
              <Header />
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
