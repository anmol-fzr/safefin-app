import { type TextStyle } from "react-native";
import { Screen, Text, GoBack, Button } from "@/components";
import { $styles, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import type { ScreenProps } from "@/navigators";
import { QuizProvider } from "@/components/quiz/QuizContext";
import { QuizRender } from "@/components/quiz/QuizRender";
import { useQuizById } from "@/hooks/useQuizById";
import { useToggle } from "@/hooks";

type QuizScreenProps = ScreenProps<"Quiz">;

export function QuizScreen(props: QuizScreenProps) {
	const quizId = props.route.params?.quizId;
	const { isOpen: isStarted, onOpen: handleQuizStart } = useToggle();

	if (!quizId) {
		throw new Error("No quizId param passed on QuizScreen");
	}

	const { themed } = useAppTheme();

	const { data: quizData, isPending, local } = useQuizById(quizId);

	// const answers = {
	// 	"1": 2,
	// 	"2": 6,
	// 	"3": 10,
	// 	"4": 15,
	// 	"5": 17,
	// 	"6": 21,
	// 	"7": 28,
	// 	"8": 31,
	// 	"9": 35,
	// };

	// const goToResults = () =>
	// 	props.navigation.push("QuizResult", { answers, quizId });

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="quizzesScreen:title" />
			<Text preset="heading" style={$title}>
				{quizData?.title}
			</Text>
			<Text style={themed($tagline)}>{quizData?.desc}</Text>
			{isStarted ? (
				<QuizProvider value={quizData}>
					<QuizRender />
				</QuizProvider>
			) : (
				<Button text="Start Quiz" onPress={handleQuizStart} />
			)}
			{/*
			<Button text="Results" onPress={goToResults} />
      */}
		</Screen>
	);
}

const $title = {
	fontSize: 24,
};

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.xxl,
});
