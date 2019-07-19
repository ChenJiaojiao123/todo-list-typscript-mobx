import React from 'react';
import { observer, inject } from 'mobx-react';

import { TodoStore } from '../../store/index';

interface IAppProps {
	todoStore: TodoStore;
}

const NewItemNum = inject("todoStore")(observer((props: {}) => {
  const injectProps = props as IAppProps;

	return (
		<div className="footer-left">
			<strong>{injectProps.todoStore.showList.length}</strong>
			<span>item left</span>
		</div>
	);
}));

export default NewItemNum;
