import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Navbar} from 'react-bootstrap';
import { openAuth, logoutUser } from '../actions/auth';
import C from '../constants';

class Auth extends Component {
	getJSX(props) {
		switch (props.auth.status) {
			case C.AUTH_LOGGED_IN: return (
				<Navbar inverse>
					<Navbar.Form pullLeft>
					<Button bsStyle="danger" onClick={props.logoutUser}>Logout</Button>
					</Navbar.Form>
					<Navbar.Text>Logged in as {props.auth.username}.</Navbar.Text>
				</Navbar>
			);
			case C.AUTH_AWAITING_RESPONSE: return (
				<Navbar inverse>
					<Navbar.Form pullLeft>
					<Button disabled>authenticating...</Button>
					</Navbar.Form>
					<Navbar.Text>Please Wait...</Navbar.Text>
				</Navbar>
			);
			default: return (
				<Navbar inverse>
					<Navbar.Form pullLeft>
					<Button bsStyle="success" onClick={props.openAuth}>Login</Button>
					</Navbar.Form>
					<Navbar.Text>Click Login for Authentication</Navbar.Text>
				</Navbar>
			);
		}
	}
	render() {
		return this.getJSX(this.props);
	}
}

const mapStateToProps = (state) => {
	return { auth: state.auth };
};

const mapDispatchToProps = {
	openAuth,
	logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
