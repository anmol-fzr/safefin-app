import { axiosInstance } from "../axios";
import type { IResData } from "../axios";

export type IResQuizzes = IResData<Quizzes>
export type IResQuiz = IResData<Quiz>

export type Quizzes = Quiz[]

export interface Quiz {
  id: number
  title: string
  desc: string
  type: any
  createdAt: string
  updatedAt: string
  questions: Question[]
}

export interface Question {
  id: number
  quiz_id: number
  question: string
  options: string[]
  answer: number
  createdAt: string
  updatedAt: string
}

export const QUIZ = {
  ALL: () => axiosInstance.get<any, IResQuizzes>("/quiz"),
  ONE: (quizId: number) => axiosInstance.get<any, IResQuiz>(`/quiz/${quizId}`)
}
