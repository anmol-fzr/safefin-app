import { Button, Screen, ScreenHeader } from "@/components";
import { FormField } from "@/components/form/FormField";
import { useYupForm } from "@/hooks";
import { profileSchema } from "@/schema";
import { $styles } from "@/theme";
import { authClient } from "@/utils/auth";
import { FormProvider } from "react-hook-form";

//type OtpState = "closed" | "open" | "sent" | "verified";

export const ProfileScreen = () => {
	//const [phoneOtpState, setPhoneOtpState] = useState<OtpState>("closed");

	const methods = useYupForm({
		schema: profileSchema,
		defaultValues: async () => {
			const { data } = await authClient.getSession();
			if (data !== null) {
				return {
					name: data.user.name,
					email: data.user.email,
					phoneNumber: data.user.phoneNumber,
				};
			}
			return {};
		},
		disabled: true,
	});

	//const { getValues } = methods;

	// async function sendOtp() {
	// 	const { phoneNumber } = getValues();
	// 	const isOtpSent = await authClient.phoneNumber.sendOtp({
	// 		phoneNumber: phoneNumber.toString(),
	// 	});
	// 	if (isOtpSent.error === null) {
	// 		console.log(isOtpSent.data.message);
	// 		setPhoneOtpState("sent");
	// 	}
	// }

	// async function verifyOtp() {
	// 	const { phoneNumber, otp } = getValues();
	// 	if (!otp) {
	// 		return;
	// 	}
	// 	const isOtpVerified = await authClient.phoneNumber.verify({
	// 		phoneNumber: phoneNumber.toString(),
	// 		code: otp.toString(),
	// 		updatePhoneNumber: true,
	// 	});
	// 	if (isOtpVerified.error === null) {
	// 		console.log(isOtpVerified.data);
	// 		setPhoneOtpState("verified");
	// 	}
	// }

	return (
		<Screen
			preset="scroll"
			contentContainerStyle={$styles.container}
			safeAreaEdges={["top"]}
		>
			<ScreenHeader
				titleTx="profileScreen:title"
				tagLineTx="profileScreen:tagLine"
			/>

			<FormProvider {...methods}>
				<FormField name="name" label="Name" placeholder="Anmol" />
				<FormField
					name="email"
					label="Email"
					placeholder="anmol@withanmol.com"
				/>
				<FormField
					name="phoneNumber"
					label="Phone Number"
					placeholder="8427822949"
				/>

				{/*
				{["open", "verified"].includes(phoneOtpState) && (
					<FormField
						name="otp"
						autoCapitalize="none"
						autoComplete="sms-otp"
						autoCorrect={false}
						labelTx="loginScreen:otpFieldLabel"
						placeholderTx="loginScreen:otpFieldPlaceholder"
						RightAccessory={() => (
							<Button
								preset="text"
								style={{
									marginTop: "auto",
									marginRight: spacing.sm,
									marginBottom: "auto",
								}}
								onPress={() => setPhoneOtpState("closed")}
							>
								Verify OTP
							</Button>
						)}
					/>
				)}
        */}
				<Button preset="reversed" disabled>
					Update
				</Button>
			</FormProvider>
		</Screen>
	);
};
