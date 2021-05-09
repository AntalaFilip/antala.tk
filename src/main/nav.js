import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { AiOutlineGithub } from 'react-icons/ai';

function Navigator() {
	return (
		<Navbar bg="warning" variant="light" expand="lg">
			<Navbar.Brand href="/">
				Filip Antala
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav classname="mr-auto">
					<Nav.Link href="/main">Home</Nav.Link>
					<Nav.Link href="/main/projects">My projects</Nav.Link>
					<Nav.Link href="/main/trackgetter">Spotify track getter</Nav.Link>
					<Nav.Link href="https://github.com/AntalaFilip">GitHub <AiOutlineGithub size="1.5em" /></Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default Navigator;