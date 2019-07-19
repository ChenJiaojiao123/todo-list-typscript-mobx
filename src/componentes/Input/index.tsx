import React from 'react';
import { IPressParams } from '@type/index';

interface IAppProps {
	type: string;
	placeholder: string;
	onPressEnter?: (params: IPressParams) => void;
	onBlur?: (params: IPressParams) => void;
	isClearInput?: boolean;
	value?: string;
	defaultValue?: string;
	className?: string;
	disabled?: boolean;
	id?: number;
}

interface IInputState {
	value: string;
	defaultValue: string;
	placeholder: string;
	type: string;
	isClearInput: boolean;
	className: string;
	disabled: boolean;
	id: number;
	cacheValue: string;
}

// type TKey = "value" | "defaultValue" | "placeholder" | "type";
type TKey = string;

class Input extends React.Component<IAppProps, IInputState> {
	constructor(props: IAppProps) {
		super(props);

		const {
			className = '',
			placeholder = '',
			type = '',
			value = '',
			defaultValue = '',
			isClearInput = false,
			disabled = false,
			id = -1
		} = props;

		this.state = {
			value: value || defaultValue,
			defaultValue,
			placeholder,
			type,
			isClearInput,
			className,
			disabled,
			id,
			cacheValue: value || defaultValue
		};
	}

	componentDidUpdate(preProps: IAppProps) {
		const {
			disabled = false,
			value = '',
			defaultValue = '',
			className = '',
			type = '',
			isClearInput = false,
			placeholder = ''
		} = this.props;

		this.resetStateFormProps(preProps, 'className', className);
		this.resetStateFormProps(preProps, 'isClearInput', isClearInput);
		this.resetStateFormProps(preProps, 'placeholder', placeholder);
		this.resetStateFormProps(preProps, 'type', type);
		this.resetStateFormProps(preProps, 'disabled', disabled);
		this.resetStateFormProps(preProps, 'defaultValue', defaultValue);
		this.resetStateFormProps(preProps, 'value', value);
	}

	private resetStateFormProps(preProps: IAppProps, key: string, value: any) {
		if (preProps[key] !== undefined && preProps[key] !== value) {
			this.setState({
				[key]: value
			} as Pick<IInputState, keyof IInputState>);
		}
	}

	//获取输入的值
	getInputValue(e: any): void {
		this.setState({
			value: e.target.value
		});
	}

	//按回车键保存输入的值
	onKeyPress(e: any): void {
		const { value, isClearInput, id } = this.state;

		if (e.which === 13 && value) {
			this.props.onPressEnter && this.props.onPressEnter({ value, id });

			if (isClearInput) {
				this.setState({
					value: ''
				});
			}
		}
	}

	onBlur() {
		const { value, id, cacheValue } = this.state;
		this.props.onBlur && this.props.onBlur({ value, id, cacheValue });
	}

	render() {
		const { value, placeholder, type, className, disabled } = this.state;

		return (
			<input
				type={type}
				className={className}
				placeholder={placeholder}
				value={value}
				disabled={disabled}
				onChange={this.getInputValue.bind(this)}
				onKeyPress={this.onKeyPress.bind(this)}
				onBlur={this.onBlur.bind(this)}
			/>
		);
	}
}

export default Input;
