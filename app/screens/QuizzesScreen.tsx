import type { TextStyle } from "react-native";
import { Screen, Card, LoadingCard, ScreenHeader } from "../components";
import { $styles, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { API } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";

export function QuizzesScreen() {
	const { data, isPending } = useQuery({
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

			{isPending
				? Array(5)
						.fill(0)
						.map((_, i) => <LoadingCard key={i} style={themed($card)} />)
				: data?.data?.map(({ id, title, desc }) => (
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
