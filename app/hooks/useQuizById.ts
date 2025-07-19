import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { IResQuizzes } from "@/services/api/quiz";
import { API } from "@/services/api";

export const useQuizById = (quizId: number) => {
	const queryClient = useQueryClient();

	const data: IResQuizzes | undefined = queryClient.getQueryData(["QUIZ"]);
	const haveQuizLocally = data !== undefined;

	const query = useQuery({
		queryKey: ["QUIZ", quizId],
		queryFn: () => API.QUIZ.ONE(quizId),
		enabled: !haveQuizLocally,
	});

	const quizData = haveQuizLocally
		? data?.data.find((quiz) => quiz.id === quizId)
		: query.data?.data;

	return haveQuizLocally
		? {
				data: quizData,
				isPending: false,
				local: true,
			}
		: {
				...query,
				data: quizData,
				local: false,
			};
};
