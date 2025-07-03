import { useCounter } from "@/hooks/useCounter";
import { useQuizContext } from "./QuizContext";
import { Text } from "../Text";
import { Button } from "../Button";
import { Pressable, View } from "react-native";
import { useAppTheme } from "@/utils/useAppTheme";
import { useCountdown } from "@/hooks/useTimer";
import { Progress } from "tamagui";
import { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { spacing } from "@/theme";

const useQuizOption = () => {
	const [opIndx, setOpIndx] = useState(-1);

	const handleOptnPress = useCallback((opt: number) => {
		setOpIndx(opt);
	}, []);

	const resetOptn = useCallback(() => {
		setOpIndx(-1);
	}, []);

	return { opIndx, handleOptnPress, resetOptn };
};

export const QuizRender = () => {
	const { opIndx, handleOptnPress, resetOptn } = useQuizOption();

	const { questions } = useQuizContext();
	const { countdown, resetTimer } = useCountdown();

	const max = questions.length - 1;
	const { counter, onNext, isLast } = useCounter({
		max,
	});
	const [userAnswers, setUserAnswers] = useState(Array(max).fill(-1));

	const navigation = useNavigation();

	useEffect(() => {
		if (countdown === 1) {
			if (isLast) {
				navigation.goBack();
				return;
			}
			onNext();
			resetOptn();
			resetTimer();
		}
	}, [countdown, onNext]);

	const currQuestion = questions[counter];

	const { theme } = useAppTheme();

	const handleNextQues = useCallback(() => {
		const updatedAnswers = [...userAnswers];
		updatedAnswers[counter] = opIndx;
		setUserAnswers(updatedAnswers);
		resetOptn();
		onNext();
	}, [resetOptn, onNext]);

	const handleSkipQues = useCallback(() => {
		resetOptn();
		onNext();
	}, [resetOptn, onNext]);

	return (
		<View>
			<View style={{ gap: 12 }}>
				<Text weight="medium">
					Question {counter + 1} of {questions.length}
				</Text>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
					}}
				>
					<Text style={{ marginLeft: 8 }}>{currQuestion.question}</Text>
					<Text>{countdown}</Text>
				</View>
				<QuizTimeProgress countdown={countdown} />
				<View style={{ gap: 4 }}>
					{currQuestion.options.map((option, indx) => (
						<Pressable
							key={option}
							style={{
								minHeight: 0,
								padding: 12,
								backgroundColor:
									opIndx === indx
										? theme.colors.palette.primary200
										: theme.colors.palette.neutral100,
								borderRadius: theme.spacing.xs,
							}}
							onPress={() => handleOptnPress(indx)}
						>
							<Text>{option}</Text>
						</Pressable>
					))}
				</View>

				<View
					style={{
						display: "flex",
						flexDirection: "row",
						gap: spacing.md,
						marginTop: spacing.md,
						justifyContent: "space-between",
					}}
				>
					{!isLast && (
						<Button
							onPress={handleSkipQues}
							text="Skip Question"
							style={{ flexGrow: 0.75 }}
						/>
					)}
					<Button
						onPress={handleNextQues}
						text="Save"
						preset="reversed"
						style={{ flexGrow: 1 }}
					/>
				</View>
			</View>
		</View>
	);
};

const QuizTimeProgress = ({ countdown }: { countdown: number }) => {
	const { theme } = useAppTheme();
	return (
		<Progress
			value={Math.min(100, Math.max(0, Math.round((countdown * 10) / 3)))}
			height={4}
			backgroundColor={theme.colors.tintInactive}
		>
			<Progress.Indicator
				animation="lazy"
				backgroundColor={theme.colors.tint}
			/>
		</Progress>
	);
};
