import { axiosInstance } from "../axios";
import { RESULT } from "./quiz-result";
import type { IResData } from "../axios";

export type IResQuizzes = IResData<Quizzes>;
export type IResQuiz = IResData<Quiz>;

export type Quizzes = Quiz[];

export interface Quiz {
	id: number;
	title: string;
	desc: string;
	isPublished: boolean;
	createdAt: string;
	updatedAt: string;
	questions: Question[];
}

export interface Question {
	id: number;
	quizId: number;
	question: string;
	answerId: number;
	createdAt: string;
	updatedAt: string;
	options: Option[];
	answer: Answer;
}

export interface Option {
	id: number;
	question_id: number;
	value: string;
	createdAt: string;
	updatedAt: string;
}

export interface Answer {
	id: number;
	question_id: number;
	value: string;
	createdAt: string;
	updatedAt: string;
}

export const QUIZ = {
	ALL: () => axiosInstance.get<any, IResQuizzes>("/quiz"),
	ONE: (quizId: number) => axiosInstance.get<any, IResQuiz>(`/quiz/${quizId}`),
	RESULT,
};
