import { Screen, ScreenHeader } from "@/components"
import { $styles } from "@/theme"

export const ProfileScreen = () => {
  return (
    <Screen preset="scroll" contentContainerStyle={$styles.container} safeAreaEdges={["top"]}>
      <ScreenHeader
        titleTx="profileScreen:title"
        tagLineTx="profileScreen:tagLine"
      />
    </Screen>
  )
}
