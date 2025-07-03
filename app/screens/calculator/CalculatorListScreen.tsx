import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Screen, ScreenHeader, ListView } from "@/components";
import { $styles, spacing } from "@/theme";
import { CalculatorType } from "@/navigators";

type Calc = {
	title: CalculatorType;
	desc: string;
	screen: string;
};

const calcs: Calc[] = [
	{
		title: "SIP",
		desc: "Calculate how much you need to save or how much you will accumulate with your SIP",
		screen: "Calc_SIP",
	},
	// {
	// 	title: "SWP",
	// 	desc: "Calculate your final amount with Systematic Withdrawal Plans (SWP)",
	// 	screen: "Calc_SWP",
	// },
	// {
	// 	title: "Mutual Fund",
	// 	desc: "Calculate the returns on your mutual fund investments",
	// 	screen: "Calc_MF",
	// },
	// {
	// 	title: "Public Provident Fund",
	// 	desc: "Calculate your returns on Public Provident Fund (PPF)",
	// 	screen: "Calc_PPF",
	// },
	// {
	// 	title: "Employee Provident Fund",
	// 	desc: "Calculate your returns on Employee's Provident Fund (PPF)",
	// 	screen: "Calc_EPF",
	// },
];

export const CalculatorListScreen = () => {
	const navigation = useNavigation();

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="calculatorListScreen:title"
				tagLineTx="calculatorListScreen:tagLine"
			/>
			<ListView
				data={calcs}
				estimatedItemSize={113}
				keyExtractor={(item) => item.title}
				renderItem={({ item: calc }) => (
					<Pressable
						onPress={() =>
							navigation.navigate("Calculator", { type: calc.title })
						}
						style={{
							borderWidth: 1,
							padding: spacing.md,
							borderRadius: spacing.md,
							gap: spacing.xs,
						}}
					>
						<Text style={{ fontSize: 24, fontWeight: "heavy" }}>
							{calc.title}
						</Text>
						<Text style={{ fontSize: 14 }}>{calc.desc}</Text>
					</Pressable>
				)}
			/>
		</Screen>
	);
};
