import React from 'react';
import { observer, inject } from 'mobx-react';
//import '../../components/ClearCompleted/clearCompleted.css';

import { TodoStore } from '../../store/index';

interface IAppProps {
	todoStore: TodoStore;
}

@inject("todoStore")
@observer
class NewClearCompleted extends React.Component<IAppProps,{}>{

  constructor(props:IAppProps) {
		super(props);
    this.buttonClick = this.buttonClick.bind(this);
  }

  buttonClick(){
    this.props.todoStore.clearFinished();
  }

  render(){
    const {buttonDisplay} = this.props.todoStore;
    
    return (
      buttonDisplay ?
       <button
        className="footer-right-show" 
        onClick={this.buttonClick}
        >Clear finished <span></span></button>: <span />
    );
  }
}

export default NewClearCompleted as any;
