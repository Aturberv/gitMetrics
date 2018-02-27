import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Glyphicon, FormControl, FormGroup, Button} from 'react-bootstrap';
import './header.css';
const client_id = "002c7138176488b1957e";//process.env.GH_CLIENT_ID;



class Header extends Component  {

	constructor(props){
		super(props);
		this.state = {
		  filter: ''
		}
		this.handleInput = this.handleInput.bind(this);
	}

	handleInput(event) {
		this.setState({
			filter: event.target.value
		})
	}

	render(){
		return (
		<div id="top_nav">
		<Navbar fixedTop>
		<Navbar.Header>
		<Navbar.Brand>
		<a href="/">
			Github Open Source Projects
		</a>
		</Navbar.Brand>
		<Navbar.Toggle />
		</Navbar.Header>
		<Navbar.Collapse>
		<Nav pullRight>
		<Navbar.Form pullLeft>
      <FormGroup>
        <FormControl type="text" placeholder="Filter by language" onChange={this.handleInput}/>
      </FormGroup>{' '}
      <Button type="submit">Filter</Button>
    </Navbar.Form>
    <Button href={`https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=http://localhost:8081`}> Login </Button>
		<NavItem
		eventKey={1}
		href="#">
		<Glyphicon glyph="icon-github" />
		</NavItem>

		</Nav>
		</Navbar.Collapse>
		</Navbar>

		</div>

		);
	}

}


export default Header;
