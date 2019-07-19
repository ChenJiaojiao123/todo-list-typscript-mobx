import React from 'react';
import { observer, inject } from 'mobx-react';

import { TodoStore } from '../../store/index';

import Input from './Input';
import Radio from '@/componentes/Radio/index';

console.log(Radio);

interface IAppProps {
	// todoStore: TodoStore;
}

interface ISectionState {
	inputValue: string;
}

interface IInjectProps {
	todoStore: TodoStore;
}

@inject('todoStore')
@observer
export default class NewSection extends React.Component<{}, ISectionState> {
	private ref: any;

	constructor(props: IAppProps) {
		super(props);
		this.state = {
			inputValue: ''
		};

		this.ref = null;
		this.getInputValue = this.getInputValue.bind(this);
	}

	get injected() {
		return this.props as IInjectProps;
	}

	//获取输入框的值
	getInputValue(e: React.ChangeEvent<HTMLInputElement>): void {
		this.setState({
			inputValue: e.target.value
		});
	}

	// 点击enter后给数组添加元素
	inputPress = (e: any): void => {
		const { inputValue } = this.state;
		if (e.which === 13 && inputValue) {
			this.injected.todoStore.addListItem(inputValue);
			this.setState({
				inputValue: ''
			});
		}
	};

	//点击叉号删除一条数组元素
	deleteItem(id: number): void {
		this.injected.todoStore.deleteListItem(id);
	}

	//点击对号
	onChangeCheckbox(id: number): void {
		this.injected.todoStore.changeListStatus(id);
	}

	//双击使输入框可编辑(修改数组的对象的unEdit属性)
	doubleClick(id: number): void {
		this.injected.todoStore.changeListUnedit(id);
	}

	//获取编辑的内容
	editInput(): void {

	}

	//按enter保存编辑的数据
	saveEditInput(id: number): void {
	
	}

	onSaveEdit(id: number): void {
		
	}

	renderList() {
		const { showList } = this.injected.todoStore;

		return showList.map((item, index) => {
			const lineThrough = item.status === 'finished' ? 'lineThrough' : '';
			return (
				//数组或迭代器内每个子元素都必须有 prop 属性："key"。
				<li className="todos__li" key={index}>
					<Radio
						id={item.id}
						name={item.listValue}
						checked={item.selected}
						onChange={this.onChangeCheckbox.bind(this, item.id)}
					/>
					<div className="todos__li-content f1" onDoubleClick={this.doubleClick.bind(this, item.id)}>
						 <input
							ref={(ref) => (this.ref = ref)}
							type="text"
							className={lineThrough}
							disabled={item.unEdit}
							onKeyPress={this.saveEditInput.bind(this, item.id)}
							onChange={this.editInput}
							onBlur={this.onSaveEdit.bind(this, item.id)}
							defaultValue={item.listValue}
						/>
						{/* <Input 
							ref={(ref) => (this.ref  = ref)}
							id={item.id}
							className={lineThrough}
							disabled={item.unEdit}
							value = ''
							defaultValue = {item.listValue}

							onChange={this.editInput.bind(this)}
							onKeyPress={this.saveEditInput.bind(this,item.id)}
							onBlur={this.onSaveEdit.bind(this, item.id)}
						/> */}
					</div>
					<div className="todos__li-operate" onClick={this.deleteItem.bind(this, item.id)}>
						<button className="delete">✖</button>
					</div>
				</li>
			);
		});
	}

	render() {
		const { inputValue } = this.state;
		return (
			<section className="content">
				<div className="content__start-gl" />
				<div className="content__form-line">
					<div className="form-checkbox">
						<span>♚</span>
					</div>
					<div className="form-input f1">
						<input
							type="text"
							placeholder="What needs to be done?"
							value={inputValue}
							onKeyPress={this.inputPress}
							onChange={this.getInputValue}
						/>
					</div>
				</div>
				<div className="todos">
					<ul>{this.renderList()}</ul>
				</div>
			</section>
		);
	}
}
