import * as React from 'react';
import NewSection from './newSection';
import NewFooter from './newFooter';

import './style/index.css';

function Mobx() {
	return (
		<div className="container">
			<header className="header">
				<h1 className="header__title">todos</h1>
			</header>
			<NewSection />
			<NewFooter />
		</div>
	);
}
export default Mobx;
