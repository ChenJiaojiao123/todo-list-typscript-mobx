import React from 'react';
import './style/index.css';

interface IAppProps {
	id: number;
	name: string;
	checked: boolean;
	onChange: () => void;
}

class Radio extends React.Component<IAppProps, any>{
	constructor(props: IAppProps) {
		super(props);
		this.onHandleRadio = this.onHandleRadio.bind(this);
	}

	//当点击对勾时
	onHandleRadio(){
		this.props.onChange();
	}
	
	render() {
		const { checked } = this.props;
		const color = checked ? 'form__item-cb active' : 'form__item-cb';
		return (
      <div className="form__item" onClick={this.onHandleRadio}>
				<span className={color}>✔</span>
			</div>
		);
	}
}

export default Radio;
