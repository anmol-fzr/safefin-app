import { observer } from "mobx-react-lite"
import { FC, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { Pressable, TextStyle, ViewStyle } from "react-native"
import {
  Button,
  Screen,
  Text,
  TextField,
} from "../components"
import { AppStackScreenProps } from "../navigators"
import { colors, type ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"
import { authClient } from "@/utils/auth"
import { useStores } from "@/models"

interface LoginScreenProps extends AppStackScreenProps<"Login"> { }


export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen() {
  const [isOtpSent, setIsOtpSent] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")

  const { authenticationStore: { setAuthToken } } = useStores()

  const [attemptsCount, setAttemptsCount] = useState(0)

  const { themed } = useAppTheme()

  async function sendOtp() {
    const otpResp = await authClient.phoneNumber.sendOtp({ phoneNumber })
    if (otpResp.error === null) {
      setIsOtpSent(true)
    }
    console.log(otpResp)
  }

  async function login() {
    if (isOtpSent) {
      const resp = await authClient.phoneNumber.verify({ phoneNumber, code: otp })
      if (resp.error === null) {
        setAuthToken(resp.data.token)
      }
      console.log(resp)

      return
    }
    await sendOtp()
    // Send OTP

    setAttemptsCount(attemptsCount + 1)

    //setAuthToken(String(Date.now()))
  }

  return (
    <Screen
      preset="auto"
      contentContainerStyle={themed($screenContentContainer)}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen:logIn" preset="heading" style={themed($logIn)} />
      <Text tx="loginScreen:enterDetails" preset="subheading" style={themed($enterDetails)} />
      {attemptsCount > 2 && (
        <Text tx="loginScreen:hint" size="sm" weight="light" style={themed($hint)} />
      )}

      <TextField
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        containerStyle={themed($textField)}
        autoCapitalize="none"
        autoComplete="tel"
        autoCorrect={false}
        keyboardType="phone-pad"
        labelTx="loginScreen:phoneFieldLabel"
        placeholderTx="loginScreen:phoneFieldPlaceholder"
      />

      {isOtpSent && (
        <TextField
          value={otp}
          onChangeText={setOtp}
          containerStyle={themed($textField)}
          autoCapitalize="none"
          autoComplete="sms-otp"
          autoCorrect={false}
          labelTx="loginScreen:otpFieldLabel"
          placeholderTx="loginScreen:otpFieldPlaceholder"
          onSubmitEditing={login}
        />
      )}

      {isOtpSent && (
        <Pressable onPress={sendOtp}>
          <Text style={{ color: colors.palette.primary500 }}>
            Resend OTP
          </Text>
        </Pressable>
      )}

      <Button
        testID="login-button"
        tx={isOtpSent ? "loginScreen:verifyOtp" : "loginScreen:sendOtp"}
        style={themed($tapButton)}
        preset="reversed"
        onPress={login}
      />
    </Screen>
  )
})

const $screenContentContainer: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
})

const $logIn: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.sm,
})

const $enterDetails: ThemedStyle<TextStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $hint: ThemedStyle<TextStyle> = ({ colors, spacing }) => ({
  color: colors.tint,
  marginBottom: spacing.md,
})

const $textField: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginBottom: spacing.lg,
})

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
  marginTop: spacing.xs,
})
