import { observable, computed, autorun, action, reaction } from 'mobx';
import {} from 'mobx-react';
import { toJS } from 'mobx';
import { TList, IItem } from '../type/';

class TodoStore {

	constructor() {
		reaction(() => this.list.map((item: IItem) => item), (list: TList) =>this.saveToLocalStorage(list));
		reaction(() => ({
			filterValue: this.filterValue,
			list: this.finishedList
		}), ({ filterValue, list }) => {
			this.buttonDisplay = !!(filterValue === "finished" && list.length);
		});
	}
	
	@observable value = localStorage.getItem('value') || '[]';
	@observable parseValue = JSON.parse(this.value);

	@observable list: TList = this.parseValue;
	@observable filterValue: string = 'all';
	@observable buttonDisplay: boolean = false;

	@computed get finishedList(): TList {
		// return this.list.filter((item: IItem)=> item.status = "finished");
		// return this.list;
		const backupList: TList = toJS(this.list);
		return backupList.filter((item: IItem)=>item.status === "finished");
	}

	@computed get unfinishedList(): TList {
		// return this.list.filter((item: IItem)=>item.status === "unfinished");
		const backupList: TList = toJS(this.list);
		return backupList.filter((item: IItem)=>item.status === "unfinished");
	}

	@computed get showList(): TList {
		const {filterValue,list,unfinishedList,finishedList} = this;
		let tempList: TList= []; 

		console.log("filterValue1: ", filterValue);

		if(filterValue === "unfinished" ){
			 tempList = unfinishedList;
			 console.log("filterValue2: ", tempList);
		} else if(filterValue === "finished" ){
			 tempList = finishedList;
			 console.log("filterValue3: ", tempList);
		} else {
			 tempList = list;
			 console.log("filterValue4: ", tempList);
		}
		return tempList;
	}

	//插入一条数组元素
	@action.bound
	addListItem(inputValue:string): void{
		const listItem: IItem = {
			id: new Date().valueOf(),
			listValue: inputValue,
			status: 'unfinished',
			selected: false,
			unEdit: true
		};
		this.list.push(listItem);
	}

	//删除一条数组元素
	@action.bound
	deleteListItem(id:number): void {
		const tempList = JSON.parse(JSON.stringify(toJS(this.list)));
		const index = tempList.findIndex((item: IItem) => item.id === id);
		tempList.splice(index, 1);
		this.list = tempList;
	}

	//修改数组的对象的unEdit属性
	@action.bound
	changeListUnedit(id:number): void {
		const tempList = JSON.parse(JSON.stringify(toJS(this.list)));
		const index = tempList.findIndex((item: IItem) => item.id === id);
		const disabled = tempList[index].unEdit;
		tempList[index].unEdit = !disabled;
		this.list = tempList;
	}

	//修改数组的对象的status属性和selected属性
	@action.bound
	changeListStatus(id:number): void{
		const tempList = JSON.parse(JSON.stringify(toJS(this.list)));
		const index = tempList.findIndex((item: IItem) => item.id === id);
		if (tempList[index].status === 'unfinished') {
			tempList[index].status = 'finished';
		} else {
			tempList[index].status = 'unfinished';
		}
		const select = tempList[index].selected;
		tempList[index].selected = !select;
		this.list = tempList;

		console.log("selected",this.list[index].selected);
		console.log("status",this.list[index].status);
	}

	//将编辑后的输入框的数据更新到数组
	updateList(id: number, editValue: string, edit: boolean): void {
		const tempList = JSON.parse(JSON.stringify(toJS(this.list)));
    const index = tempList.findIndex((item: IItem) => item.id === id);
		tempList[index].listValue = editValue;
		tempList[index].unEdit = edit;
		this.list = tempList;
	}

	//更新filterValue的值，当filterValue等于finished时，显示清除按钮
	@action.bound
	changeStatus(status: string): void {
		this.filterValue = status;
		console.log('filterValue', this.filterValue);
	}

	//删除status==finished的数组元素
	@action.bound
	clearFinished() :void{
		//console.log("clearFinished");
		const tempList = JSON.parse(JSON.stringify(toJS(this.list)));
		const newArr = tempList.filter((item: IItem) => item.status === 'unfinished');
		this.list = newArr;
	}

	//将list保存在localStorage中
	saveToLocalStorage(list: TList): void {
		const key = 'value';
		const stringList = JSON.stringify(list);
		localStorage.setItem(key, stringList);
	}

}

const todoStore = new TodoStore();

export {
	TodoStore,
	todoStore
};

