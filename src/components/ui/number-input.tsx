import { Input } from "@components/ui/input";
import React, { forwardRef, useCallback, useEffect, useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";

export interface NumberInputProps
	extends Omit<NumericFormatProps, "value" | "onValueChange"> {
	stepper?: number;
	thousandSeparator?: string;
	placeholder?: string;
	defaultValue?: string;
	min?: number;
	max?: number;
	value?: string; // Controlled value
	suffix?: string;
	prefix?: string;
	onValueChange?: (value: string | undefined) => void;
	fixedDecimalScale?: boolean;
	decimalScale?: number;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
	(
		{
			stepper,
			thousandSeparator,
			placeholder,
			defaultValue,
			min = Number.NEGATIVE_INFINITY,
			max = Number.POSITIVE_INFINITY,
			onValueChange,
			fixedDecimalScale = false,
			decimalScale = 0,
			suffix,
			prefix,
			value: controlledValue,
			maxLength,
			// ...props
		},
		ref,
	) => {
		const [value, setValue] = useState<string | undefined>(
			controlledValue ?? defaultValue,
		);

		const handleIncrement = useCallback(() => {
			setValue((prev) =>
				prev === undefined
					? (stepper ?? 1).toString()
					: Math.min(Number(prev) ?? 0 + (stepper ?? 1), max).toString(),
			);
		}, [stepper, max]);

		const handleDecrement = useCallback(() => {
			setValue((prev) =>
				prev === undefined
					? (-(stepper ?? 1)).toString()
					: Math.max(Number(prev) ?? 0 - (stepper ?? 1), min).toString(),
			);
		}, [stepper, min]);

		useEffect(() => {
			const handleKeyDown = (e: KeyboardEvent) => {
				if (
					document.activeElement ===
					(ref as React.RefObject<HTMLInputElement>).current
				) {
					if (e.key === "ArrowUp") {
						handleIncrement();
					} else if (e.key === "ArrowDown") {
						handleDecrement();
					}
				}
			};

			window.addEventListener("keydown", handleKeyDown);

			return () => {
				window.removeEventListener("keydown", handleKeyDown);
			};
		}, [handleIncrement, handleDecrement, ref]);

		useEffect(() => {
			if (controlledValue !== undefined) {
				setValue(controlledValue);
			}
		}, [controlledValue]);

		const handleChange = (values: {
			value: string;
			floatValue: number | undefined;
		}) => {
			const newValue =
				values.floatValue === undefined ? undefined : values.floatValue;
			setValue(newValue ? newValue.toString() : "");
			if (onValueChange) {
				onValueChange(newValue ? newValue.toString() : "");
			}
		};

		// const handleBlur = () => {
		// 	if (value !== undefined) {
		// 		let newValue = Number(value) ?? 0;
		// 		if (newValue < min) {
		// 			newValue = min;
		// 		} else if (newValue > max) {
		// 			newValue = max;
		// 		}
		// 		setValue(newValue.toString());

		// 		// Ensure ref is properly assigned before setting value
		// 		if (ref && "current" in ref && ref.current) {
		// 			ref.current.value = String(newValue);
		// 		}
		// 	}
		// };

		return (
			<div className="flex items-center w-full">
				<NumericFormat
					value={value}
					onValueChange={handleChange}
					thousandSeparator={thousandSeparator}
					decimalScale={decimalScale}
					fixedDecimalScale={fixedDecimalScale}
					allowNegative={min < 0}
					valueIsNumericString
					// onBlur={handleBlur}
					max={max}
					min={min}
					suffix={suffix}
					prefix={prefix}
					customInput={Input}
					placeholder={placeholder}
					className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none rounded-r-none relative text-right"
					getInputRef={ref}
					maxLength={maxLength}
					// {...props}
				/>
			</div>
		);
	},
);
