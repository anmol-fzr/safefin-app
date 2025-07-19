import { Question } from "@/services/api/quiz";
import { useState, useCallback, useContext, createContext } from "react";

type QuestionContext = ReturnType<typeof useQuestion> & {
	question: Question;
};

const questionContext = createContext<QuestionContext | null>(null);

const useQuestionContext = () => {
	const t = useContext(questionContext);
	if (t === null || t === undefined) {
		throw new Error(
			"useQuestionContext must be used inside QuestionProvider component",
		);
	}
	return t;
};

const useQuestion = () => {
	const [opIndx, setOpIndx] = useState(-1);

	const resetOptn = useCallback(() => {
		setOpIndx(-1);
	}, []);

	const handleOptnPress = useCallback((opt: number) => {
		setOpIndx(opt);
	}, []);

	return { opIndx, handleOptnPress, resetOptn };
};

const QuestionProvider = questionContext.Provider;

export { QuestionProvider, useQuestionContext, useQuestion };
