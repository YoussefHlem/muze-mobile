import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

import AuthHeader from "../../components/Auth/Header";
import RegisterForm from "../../components/Auth/RegisterForm";
import TermsFooter from "../../components/Auth/TermsFooter";

const SignUp = () => {
  return (
    <>
      <AuthHeader AuthMode="signUp" />
      <SafeAreaView className="flex-1 bg-[#0D0D1B]">
        <ScrollView>
          <RegisterForm />
          <TermsFooter />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SignUp;
