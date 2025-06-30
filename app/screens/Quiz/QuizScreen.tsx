import { TextStyle, View } from "react-native"
import { Screen, Text, GoBack, Button, Card, Icon } from "@/components"
import { $styles, colors, type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import type { ScreenProps } from "@/navigators"
import type { IResQuizzes } from "@/services/api/quiz"
import { API } from "@/services/api"
import { useCallback, useState } from "react"
import { useNavigation } from "@react-navigation/native"

type QuizScreenProps = ScreenProps<"Quiz">

export function QuizScreen(props: QuizScreenProps) {
  const quizId = props.route.params?.quizId
  // -1 quiz no started yet, 0 onwards index of question
  const [quesIndx, setQuesIndx] = useState(-1)
  const [opIndx, setOpIndx] = useState(-1)

  if (!quizId) {
    throw new Error("No quizId param passed on QuizScreen")
  }

  const queryClient = useQueryClient()
  const navigation = useNavigation()
  const { themed, theme } = useAppTheme()

  const data: IResQuizzes | undefined = queryClient.getQueryData(["QUIZ"])

  const query = useQuery({ queryKey: ['QUIZ', quizId], queryFn: () => API.QUIZ.ONE(quizId), enabled: data === undefined })

  const quizData = data === undefined ? query.data?.data : data?.data.find(quiz => quiz.id === quizId)

  const isLastQues = quesIndx === quizData?.questions?.length - 1
  const hasQuizStarted = quesIndx !== -1;

  const onNextQuestion = useCallback(() => {
    if (isLastQues) {
      navigation.goBack()
      return
    }
    setQuesIndx(curr => curr + 1)
    setOpIndx(-1)
  }, [isLastQues])

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <GoBack tx="quizzesScreen:title" />
      <Text preset="heading" style={$title} >{quizData?.title}</Text>
      <Text style={themed($tagline)} >
        {quizData?.desc}
      </Text>
      {hasQuizStarted ? (
        <View>
          <View style={{ gap: 12 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={{ marginLeft: 8 }}>
                {quizData?.questions[quesIndx].question}
              </Text>
              <Text>
                {quesIndx + 1}/{quizData?.questions.length}
              </Text>
            </View>
            <View style={{ gap: 4 }}>
              {quizData?.questions[quesIndx].options.map((option, indx) => (
                <Card key={option} heading={option}
                  style={{
                    minHeight: 0,
                    padding: 12,
                    backgroundColor: opIndx === indx ? colors.palette.primary200 : colors.palette.neutral100
                  }}
                  onPress={() => {
                    setOpIndx(indx)
                  }}
                />
              ))}
            </View>
            <Button onPress={onNextQuestion} disabled={opIndx === -1}>
              {isLastQues ? (
                <Text>
                  Submit
                </Text>
              ) : (
                <>
                  <Text>
                    Next Question
                  </Text>
                  <Icon icon="back" color={theme.colors.palette.primary500} size={20}
                    style={{
                      marginLeft: 12,
                      transform: [{ rotate: '180deg' }],
                    }} />
                </>
              )}
            </Button>
          </View>
        </View>
      ) : (
        <Button onPress={onNextQuestion} >
          Start Quiz
        </Button>
      )
      }
    </Screen >
  )
}

const $title = {
  fontSize: 24
}

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})
