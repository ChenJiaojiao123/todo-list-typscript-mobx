import React from 'react';
import { observer, inject } from 'mobx-react';
import { TodoStore } from '../../store/index';
import Radio from '@component/Radio/index';
import Input from '@component/Input/index';
import { IPressParams } from '@type/index';

interface IAppProps {}

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
	}

	get injected() {
		return this.props as IInjectProps;
	}

	//往数组中增加一条元素
	onAddTodoItem = ({ value }: IPressParams): void => {
		this.injected.todoStore.addListItem(value);
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
	doubleClick(id: number, status: string): void {
		if (status !== 'finished') {
			this.injected.todoStore.changeListUnedit(id);
		}
	}

	//按enter保存编辑的数据
	saveEditInput = ({ value, id = -1 }: IPressParams): void => {
		//console.log("saveEditInput");
		this.injected.todoStore.updateList(id, value, true);
	};

	renderList() {
		const { showList } = this.injected.todoStore;

		return showList.map((item) => {
			const lineThrough = item.status === 'finished' ? 'lineThrough' : '';
			return (
				//数组或迭代器内每个子元素都必须有 prop 属性："key"。
				<li className="todos__li" key={item.id}>
					<Radio
						id={item.id}
						name={item.listValue}
						checked={item.selected}
						onChange={this.onChangeCheckbox.bind(this, item.id)}
					/>
					<div
						className="todos__li-content f1"
						onDoubleClick={this.doubleClick.bind(this, item.id, item.status)}
					>
						{/* <input
							ref={(ref) => (this.ref = ref)}
							type="text"
							className={lineThrough}
							disabled={item.unEdit}
							onKeyPress={this.saveEditInput.bind(this, item.id)}
							onChange={this.editInput}
							onBlur={this.onSaveEdit.bind(this, item.id)}
							defaultValue={item.listValue}
						/> */}

						<Input
							type="text"
							placeholder=""
							className={lineThrough}
							value={item.listValue}
							disabled={item.unEdit}
							id={item.id}
							onPressEnter={this.saveEditInput}
							onBlur={this.saveEditInput}
						/>
					</div>
					<div className="todos__li-operate" onClick={this.deleteItem.bind(this, item.id)}>
						<button className="delete">✖</button>
					</div>
				</li>
			);
		});
	}

	render() {
		return (
			<section className="content">
				<div className="content__start-gl" />
				<div className="content__form-line">
					<div className="form-checkbox">
						<span>♚</span>
					</div>
					<div className="form-input f1">
						{/* <input
							type="text"
							placeholder="What needs to be done?"
							value={inputValue}
							onKeyPress={this.inputPress}
							onChange={this.getInputValue}
						/> */}
						<Input
							type="text"
							isClearInput={true}
							placeholder="What needs to be done?"
							onPressEnter={this.onAddTodoItem}
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
