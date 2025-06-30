import { TextStyle } from "react-native"
import { Screen, Text, Card } from "../components"
import { $styles, type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { API } from "@/services/api"
import { useQuery } from "@tanstack/react-query"
import { useNavigation } from "@react-navigation/native"

// const queryResp = {
//   "data": [
//     {
//       "id": 1,
//       "title": "finance fundamentals 101",
//       "desc": "very fundamentals quiz on finance",
//       "type": null,
//       "createdat": "2025-06-29t15:34:51.952z",
//       "updatedat": "2025-06-29t15:34:51.952z",
//       "questions": [
//         {
//           "id": 1,
//           "quiz_id": 1,
//           "question": "what does sip stand for ?",
//           "options": [
//             "systematic investment plan",
//             "systematic integration plan",
//             "simple investment plan",
//             "simple investment plan"
//           ],
//           "answer": 0,
//           "createdat": "2025-06-29t15:57:39.279z",
//           "updatedat": "2025-06-29t15:57:39.279z"
//         }
//       ]
//     },
//     {
//       "id": 2,
//       "title": "finance fundamentals 102",
//       "desc": "fundamentals quiz on finance",
//       "type": null,
//       "createdat": "2025-06-29t16:37:32.145z",
//       "updatedat": "2025-06-29t16:37:32.145z",
//       "questions": [
//         {
//           "id": 2,
//           "quiz_id": 2,
//           "question": "what does sip stand for ?",
//           "options": [
//             "systematic investment plan",
//             "systematic integration plan",
//             "simple investment plan",
//             "simple investment plan"
//           ],
//           "answer": 0,
//           "createdat": "2025-06-29t16:37:49.914z",
//           "updatedat": "2025-06-29t16:37:49.914z"
//         }
//       ]
//     },
//     {
//       "id": 3,
//       "title": "finance fundamentals 103",
//       "desc": "very fundamentals quiz on finance",
//       "type": null,
//       "createdat": "2025-06-29t15:34:51.952z",
//       "updatedat": "2025-06-29t15:34:51.952z",
//       "questions": [
//         {
//           "id": 1,
//           "quiz_id": 1,
//           "question": "what does sip stand for ?",
//           "options": [
//             "systematic investment plan",
//             "systematic integration plan",
//             "simple investment plan",
//             "simple investment plan"
//           ],
//           "answer": 0,
//           "createdat": "2025-06-29t15:57:39.279z",
//           "updatedat": "2025-06-29t15:57:39.279z"
//         }
//       ]
//     },
//     {
//       "id": 4,
//       "title": "finance fundamentals 104",
//       "desc": "fundamentals quiz on finance",
//       "type": null,
//       "createdat": "2025-06-29t16:37:32.145z",
//       "updatedat": "2025-06-29t16:37:32.145z",
//       "questions": [
//         {
//           "id": 2,
//           "quiz_id": 2,
//           "question": "what does sip stand for ?",
//           "options": [
//             "systematic investment plan",
//             "systematic integration plan",
//             "simple investment plan",
//             "simple investment plan"
//           ],
//           "answer": 0,
//           "createdat": "2025-06-29t16:37:49.914z",
//           "updatedat": "2025-06-29t16:37:49.914z"
//         }
//       ]
//     },
//     {
//       "id": 5,
//       "title": "finance fundamentals 105",
//       "desc": "very fundamentals quiz on finance",
//       "type": null,
//       "createdat": "2025-06-29t15:34:51.952z",
//       "updatedat": "2025-06-29t15:34:51.952z",
//       "questions": [
//         {
//           "id": 1,
//           "quiz_id": 1,
//           "question": "what does sip stand for ?",
//           "options": [
//             "systematic investment plan",
//             "systematic integration plan",
//             "simple investment plan",
//             "simple investment plan"
//           ],
//           "answer": 0,
//           "createdat": "2025-06-29t15:57:39.279z",
//           "updatedat": "2025-06-29t15:57:39.279z"
//         }
//       ]
//     },
//     {
//       "id": 6,
//       "title": "finance fundamentals 106",
//       "desc": "fundamentals quiz on finance",
//       "type": null,
//       "createdat": "2025-06-29t16:37:32.145z",
//       "updatedat": "2025-06-29t16:37:32.145z",
//       "questions": [
//         {
//           "id": 2,
//           "quiz_id": 2,
//           "question": "what does sip stand for ?",
//           "options": [
//             "systematic investment plan",
//             "systematic integration plan",
//             "simple investment plan",
//             "simple investment plan"
//           ],
//           "answer": 0,
//           "createdat": "2025-06-29t16:37:49.914z",
//           "updatedat": "2025-06-29t16:37:49.914z"
//         }
//       ]
//     },
//     {
//       "id": 7,
//       "title": "finance fundamentals 107",
//       "desc": "very fundamentals quiz on finance",
//       "type": null,
//       "createdat": "2025-06-29t15:34:51.952z",
//       "updatedat": "2025-06-29t15:34:51.952z",
//       "questions": [
//         {
//           "id": 1,
//           "quiz_id": 1,
//           "question": "what does sip stand for ?",
//           "options": [
//             "systematic investment plan",
//             "systematic integration plan",
//             "simple investment plan",
//             "simple investment plan"
//           ],
//           "answer": 0,
//           "createdat": "2025-06-29t15:57:39.279z",
//           "updatedat": "2025-06-29t15:57:39.279z"
//         }
//       ]
//     },
//     {
//       "id": 8,
//       "title": "finance fundamentals 108",
//       "desc": "fundamentals quiz on finance",
//       "type": null,
//       "createdat": "2025-06-29t16:37:32.145z",
//       "updatedat": "2025-06-29t16:37:32.145z",
//       "questions": [
//         {
//           "id": 2,
//           "quiz_id": 2,
//           "question": "what does sip stand for ?",
//           "options": [
//             "systematic investment plan",
//             "systematic integration plan",
//             "simple investment plan",
//             "simple investment plan"
//           ],
//           "answer": 0,
//           "createdat": "2025-06-29t16:37:49.914z",
//           "updatedat": "2025-06-29t16:37:49.914z"
//         }
//       ]
//     },
//     {
//       "id": 9,
//       "title": "finance fundamentals 109",
//       "desc": "very fundamentals quiz on finance",
//       "type": null,
//       "createdat": "2025-06-29t15:34:51.952z",
//       "updatedat": "2025-06-29t15:34:51.952z",
//       "questions": [
//         {
//           "id": 1,
//           "quiz_id": 1,
//           "question": "what does sip stand for ?",
//           "options": [
//             "systematic investment plan",
//             "systematic integration plan",
//             "simple investment plan",
//             "simple investment plan"
//           ],
//           "answer": 0,
//           "createdat": "2025-06-29t15:57:39.279z",
//           "updatedat": "2025-06-29t15:57:39.279z"
//         }
//       ]
//     },
//     {
//       "id": 10,
//       "title": "finance fundamentals 110",
//       "desc": "fundamentals quiz on finance",
//       "type": null,
//       "createdat": "2025-06-29t16:37:32.145z",
//       "updatedat": "2025-06-29t16:37:32.145z",
//       "questions": [
//         {
//           "id": 2,
//           "quiz_id": 2,
//           "question": "what does sip stand for ?",
//           "options": [
//             "systematic investment plan",
//             "systematic integration plan",
//             "simple investment plan",
//             "simple investment plan"
//           ],
//           "answer": 0,
//           "createdat": "2025-06-29t16:37:49.914z",
//           "updatedat": "2025-06-29t16:37:49.914z"
//         }
//       ]
//     },
//   ]
// }

export function QuizzesScreen() {
  const query = useQuery({ queryKey: ['QUIZ'], queryFn: API.QUIZ.ALL })

  const navigation = useNavigation()
  const { themed } = useAppTheme()

  console.dir(query.data)

  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <Text preset="heading" tx="quizzesScreen:title" style={themed($title)} />
      <Text tx="quizzesScreen:tagLine" style={themed($tagline)} />

      {query.data?.data?.map(({ id, title, desc }) => (
        <Card
          key={id}
          heading={title} headingStyle={{ textTransform: "capitalize" }}
          content={desc}
          onPress={() => navigation.navigate("Quiz", { quizId: id })}
          style={themed($card)}
        >
        </Card>
      ))}
    </Screen>
  )
}

const $title: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $card: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xs,
  padding: spacing.sm
})

const $tagline: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.xxl,
})
