import type { TextStyle } from "react-native";
import { Screen, Card, ScreenHeader, Button } from "../components";
import { $styles, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { API } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

export function QuizzesScreen() {
	const { data } = useQuery({
		queryKey: ["QUIZ"],
		queryFn: API.QUIZ.ALL,
	});

	const navigation = useNavigation();
	const { themed } = useAppTheme();

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="quizzesScreen:title"
				tagLineTx="quizzesScreen:tagLine"
			/>

			{data?.data?.map(({ id, title, desc }) => (
				<Card
					key={id}
					heading={title}
					headingStyle={{ textTransform: "capitalize" }}
					content={desc}
					onPress={() => navigation.navigate("Quiz", { quizId: id })}
					style={themed($card)}
				/>
			))}
		</Screen>
	);
}

const $card: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.xs,
	padding: spacing.sm,
});
