import { useSIPCalculatorLogic } from "@/hooks/useSip";
import { CalculatorType } from "@/navigators";
import { calcSwp } from "./funcs";

type SliderConfig = {
	label: string;
	key: string;
	value: number;
	step: number;
	minValue: number;
	maxValue: number;
};

type CalculatorConfig = {
	title: string;
	sliders: SliderConfig[];
	resultKeys: [string, string][];
	pieChart?: boolean;
	calculate: Function;
};

type CalculatorConfigs = {
	[K in CalculatorType]: CalculatorConfig;
};

export const SIP_CALCULATOR_CONFIG: CalculatorConfigs = {
	SIP: {
		title: "SIP Calculator",
		sliders: [
			{
				label: "Monthly Investment",
				key: "investment",
				value: 25000,
				step: 100,
				minValue: 100,
				maxValue: 1000000,
			},
			{
				label: "Expected Return Rate (p.a)",
				key: "rate",
				value: 12,
				step: 0.1,
				minValue: 1,
				maxValue: 30,
			},
			{
				label: "Time Period (in Years)",
				key: "duration",
				value: 10,
				step: 1,
				minValue: 1,
				maxValue: 40,
			},
		],
		resultKeys: [
			["totalInvested", "Total Invested"],
			["returns", "Returns"],
			["totalValue", "Total Value"],
		],
		pieChart: true,
		calculate: useSIPCalculatorLogic,
	},
	SWP: {
		title: "SWP Calculator",
		sliders: [
			{
				label: "Total investment",
				key: "totalInvestment",
				value: 5_00_000,
				step: 100,
				minValue: 1000,
				maxValue: 10_000_000,
			},
			{
				label: "Withdrawl per month",
				key: "withdrawlPM",
				value: 10_000,
				step: 100,
				minValue: 500,
				maxValue: 1_000_000,
			},
			{
				label: "Expected Return Rate (p.a)",
				key: "rate",
				value: 8,
				step: 0.1,
				minValue: 1,
				maxValue: 30,
			},
			{
				label: "Time Period (in Years)",
				key: "duration",
				value: 10,
				step: 1,
				minValue: 1,
				maxValue: 40,
			},
		],
		resultKeys: [
			["totalInvestment", "Total Investment"],
			["totalWithdrawl", "Total Withdrawl"],
			["finalValue", "Final Value"],
		],
		pieChart: false,
		calculate: calcSwp,
	},
};
