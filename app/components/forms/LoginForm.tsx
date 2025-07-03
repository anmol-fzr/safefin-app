import { useCallback, useState } from "react";
import { Pressable, type ViewStyle } from "react-native";
import { Button, Text } from "@/components";
import { colors, type ThemedStyle } from "@/theme";
import { useAppTheme } from "@/utils/useAppTheme";
import { authClient } from "@/utils/auth";
import { useStores } from "@/models";
import { FormProvider } from "react-hook-form";
import { FormField } from "@/components/form/FormField";
import { loginSchema } from "@/schema";
import { useYupForm } from "@/hooks";
import { useNavigation } from "@react-navigation/native";

export const LoginForm = () => {
	const methods = useYupForm({
		schema: loginSchema,
	});
	const { handleSubmit, getValues, setError } = methods;

	const [isOtpSent, setIsOtpSent] = useState(false);

	const {
		authenticationStore: { setAuthState },
	} = useStores();

	const { themed } = useAppTheme();
	const navigation = useNavigation();

	const sendOtp = useCallback(async () => {
		const vals = getValues();
		const phoneNumber = vals.phoneNumber.toString();
		if (!phoneNumber) {
			setError(
				"phoneNumber",
				{ message: "Enter a Valid Phone Number" },
				{ shouldFocus: true },
			);
			return;
		}
		const otpResp = await authClient.phoneNumber.sendOtp({ phoneNumber });
		if (otpResp.error === null) {
			setIsOtpSent(true);
		}
	}, [getValues, setError]);

	const login = handleSubmit(async (data) => {
		if (isOtpSent) {
			if (!data.otp) {
				setError(
					"otp",
					{ message: "Enter a Valid OTP" },
					{ shouldFocus: true },
				);
				return;
			}

			const resp = await authClient.phoneNumber.verify({
				phoneNumber: data.phoneNumber.toString(),
				code: data.otp.toString(),
			});
			console.log(resp);
			if (resp.error === null) {
				if (resp.data.user.phoneNumber === resp.data.user.email) {
					setAuthState("register");
					navigation.navigate("Registration");
					return;
				}
				setAuthState("complete");
			}
			return;
		}
		await sendOtp();
	});

	return (
		<>
			<FormProvider {...methods}>
				<FormField
					name="phoneNumber"
					autoCapitalize="none"
					autoComplete="tel"
					autoCorrect={false}
					keyboardType="phone-pad"
					labelTx="loginScreen:phoneFieldLabel"
					placeholderTx="loginScreen:phoneFieldPlaceholder"
				/>

				{isOtpSent && (
					<FormField
						name="otp"
						autoCapitalize="none"
						autoComplete="sms-otp"
						autoCorrect={false}
						labelTx="loginScreen:otpFieldLabel"
						placeholderTx="loginScreen:otpFieldPlaceholder"
						onSubmitEditing={login}
					/>
				)}
			</FormProvider>

			{isOtpSent && (
				<Pressable onPress={sendOtp}>
					<Text style={{ color: colors.palette.primary500 }}>Resend OTP</Text>
				</Pressable>
			)}

			<Button
				testID="login-button"
				tx={isOtpSent ? "loginScreen:verifyOtp" : "loginScreen:sendOtp"}
				style={themed($tapButton)}
				preset="reversed"
				onPress={login}
			/>
		</>
	);
};

const $tapButton: ThemedStyle<ViewStyle> = ({ spacing }) => ({
	marginTop: spacing.xs,
});
