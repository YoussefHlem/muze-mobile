import { getItemAsync } from "expo-secure-store";

export const getAuthToken = async () => {
  return await getItemAsync("accessToken");
};
