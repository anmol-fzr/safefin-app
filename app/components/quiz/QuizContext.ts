import { createContext, useContext } from "react";
import type { Quiz } from "@/services/api/quiz";

const quizContext = createContext<Quiz | null>(null);

const useQuizContext = () => {
	const t = useContext(quizContext);
	if (t === null || t === undefined) {
		throw new Error(
			"useQuizContext must be used inside QuizProvider component",
		);
	}
	return t;
};
const QuizProvider = quizContext.Provider;

export { QuizProvider, useQuizContext };
