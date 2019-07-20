import * as React from 'react';
import { TodoStore } from '../../store/index';
import { inject, observer } from 'mobx-react';

interface IAppProps {
	todoStore: TodoStore;
}

interface IHomeState {
	loading: boolean;
}

// const Home: React.FC<IAppProps> = ({ todoStore }) => {
//   return (
//     <div>Home</div>
//   )
// }

// function Home ({ todoStore }:IAppProps) {
//   return (
//     <div>{ todoStore.list }</div>
//   )
// }

// const Home = inject('todoStore')(
// 	observer(({ todoStore }: IAppProps) => {
// 		return <div>{todoStore.list}</div>;
// 	})
// );


class Home extends React.Component<IAppProps, IHomeState> {
	constructor(props: IAppProps) {
		super(props);

		this.state = {
			loading: true
		};
  }
  
  public componentDidMount() {
    console.log(this.props);
  }

	render() {
		return (
			<div>
        <div>{ this.state.loading ? "loading..." : "" }</div>
        {/* <div>{ this.props.history }</div> */}
			</div>
		);
	}
}

export default Home;
