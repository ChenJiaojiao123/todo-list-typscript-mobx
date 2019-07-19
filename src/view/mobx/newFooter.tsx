import React from 'react';
import NewItemNum from './newItemNum';
import NewStatus from './newStatus'
import NewClearCompleted from './newClearCompleted';



class NewFooter extends React.Component<{},{}>{
  
  render(){
    return (
      <footer className="footer">
        <NewItemNum />
        <NewStatus />
        <NewClearCompleted />
      </footer>
    )
  }
}

export default NewFooter;
