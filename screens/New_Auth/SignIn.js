import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

import AuthHeader from "../../components/Auth/Header";
import LoginForm from "../../components/Auth/LoginForm";
import TermsFooter from "../../components/Auth/TermsFooter";

const SignIn = () => {
  return (
    <>
      <AuthHeader />
      <SafeAreaView className="flex-1 bg-[#0D0D1B]">
        <ScrollView>
          <LoginForm />
          <TermsFooter />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignIn;
