import React from 'react';

import { observer, inject } from 'mobx-react';

import { TodoStore } from '../../store/index';

interface IAppProps {
	id: number;
	className: string;
	disabled: boolean;
	value: string;
	defaultValue: string;

	onKeyPress: () => void;
	onChange: () => void;
	onBlur: () => void;
}

interface IInputState {
	id: number;
	editValue: string;
	value: string;
	disabled: boolean;
}

interface IInjectProps {
	todoStore: TodoStore;
}

@inject('todoStore')
@observer
class Input extends React.Component<IAppProps,IInputState> {
	private ref: HTMLInputElement | null;

	constructor(props: IAppProps) {
		super(props);
		this.state ={
			editValue:'',
			value: this.props.value,
			disabled: this.props.disabled,
			id: this.props.id,
		}
		this.ref = null;
	}

	//获取编辑的内容
	editInput(e: any): void {
		this.setState({
			editValue: e.target.value
		});
	}

	//按enter保存编辑的数据
	saveEditInput(e: any): void {
		if (e.which === 13) {
			this.onSaveEdit();
		}
	}

	onSaveEdit(): void {
		const {id,editValue} = this.state;
		this.ref && this.ref.blur();
	}

	render() {
		const { className} = this.props;
		const {disabled,value} = this.state;
		return (
			<input
				ref={(ref) => (this.ref = ref)}
				type="text"
				className = {className}
				disabled = {disabled}
				value = {value}

				onChange={this.editInput.bind(this)}
				onKeyPress={this.saveEditInput.bind(this)}
				onBlur={this.onSaveEdit.bind(this)}
			/>
		);
	}
}

export default Input;
