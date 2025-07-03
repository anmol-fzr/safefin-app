import { type TextStyle } from "react-native";
import { Screen, Text, GoBack } from "@/components";
import { $styles, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ScreenProps } from "@/navigators";
import type { IResQuizzes } from "@/services/api/quiz";
import { API } from "@/services/api";
import { QuizProvider } from "@/components/quiz/QuizContext";
import { QuizRender } from "@/components/quiz/Quiz";

type QuizScreenProps = ScreenProps<"Quiz">;

export function QuizScreen(props: QuizScreenProps) {
	const quizId = props.route.params?.quizId;

	if (!quizId) {
		throw new Error("No quizId param passed on QuizScreen");
	}

	const queryClient = useQueryClient();
	const { themed } = useAppTheme();

	const data: IResQuizzes | undefined = queryClient.getQueryData(["QUIZ"]);

	const query = useQuery({
		queryKey: ["QUIZ", quizId],
		queryFn: () => API.QUIZ.ONE(quizId),
		enabled: data === undefined,
	});

	const quizData =
		data === undefined
			? query.data?.data
			: data?.data.find((quiz) => quiz.id === quizId);

	//const isLastQues = quesIndx === quizData?.questions?.length - 1;
	//const hasQuizStarted = quesIndx !== -1;

	// const onNextQuestion = useCallback(() => {
	// 	if (isLastQues) {
	// 		navigation.goBack();
	// 		return;
	// 	}
	// 	setQuesIndx((curr) => curr + 1);
	// 	setOpIndx(-1);
	// }, [isLastQues]);

	if (!quizData) {
		return <Text>Quiz is undefined, make sure its present</Text>;
	}

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<GoBack tx="quizzesScreen:title" />
			<QuizProvider value={quizData}>
				<Text preset="heading" style={$title}>
					{quizData?.title}
				</Text>
				<Text style={themed($tagline)}>{quizData?.desc}</Text>
				<QuizRender />
			</QuizProvider>
		</Screen>
	);
}

const $title = {
	fontSize: 24,
};

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
	marginBottom: spacing.xxl,
});
