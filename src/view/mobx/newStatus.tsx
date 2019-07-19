import React from 'react';
import { observer, inject } from 'mobx-react';

//import '../../components/Status/status.css';

import { TodoStore } from '../../store/index';

interface IAppProps {
	todoStore: TodoStore;
}

@inject("todoStore")
@observer
class NewStatus extends React.Component<IAppProps,{}>{

  //点击a标签切换filterValue的值
  clickATarget(status:string){
    this.props.todoStore.changeStatus(status);
  }
 
  render(){
    const activeClass = this.props.todoStore.filterValue;
    return (
      <ul className="footer-middle">
        <li>
          <span 
          className={activeClass === "all" ? "active": ""}
           onClick={this.clickATarget.bind(this,"all")}
          >All</span>
         </li>
        <li>
        <span 
        className={activeClass === "unfinished" ? "active": ""}
         onClick={this.clickATarget.bind(this,"unfinished")} 
        >Unfinished</span>
        </li>
         <li>
         <span 
         className={activeClass === "finished" ? "active": ""} 
         onClick={this.clickATarget.bind(this,"finished")}
         >Finished</span>
       </li>
      </ul>
    );
  }
}

export default NewStatus as any;
