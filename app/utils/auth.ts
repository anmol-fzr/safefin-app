import { createAuthClient } from "better-auth/react";

import { phoneNumberClient } from "better-auth/client/plugins"
import { expoClient } from "@better-auth/expo/client";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
  baseURL: "http://192.168.29.57:3000",
  plugins: [
    expoClient({
      scheme: "safefin",
      storagePrefix: "safefin",
      storage: SecureStore,
    }),
    phoneNumberClient(),
  ]
});
