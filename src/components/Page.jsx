import React from 'react';
import Auth from './Auth';
import Feedback from './Feedback';
import Articles from './Articles';

const Page = () => {
	return (
		<div>
			<Auth />
			<Articles />
			<Feedback />
		</div>
	);
};

export default Page;
