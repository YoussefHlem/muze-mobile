import React from "react";
import { View, Text, StyleSheet, ScrollView, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PrivacyPolicy = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <Text style={styles.title}>Welcome to Muze!</Text>
        <Text style={styles.paragraph}>
          We're committed to protecting your privacy and ensuring the security
          of your personal information. This Privacy Policy outlines how we
          collect, use, and safeguard your data when you use our website
          muze-network.com and our services.
        </Text>

        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.paragraphSection}>
            - When you create an account on Muze, we may collect personal
            information such as your name, email address, and profile details.
          </Text>
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.paragraphSection}>
            - We use the information we collect to provide and improve our
            services, personalize your experience, and communicate with you
            about updates and promotions.
          </Text>
        </Text>

        <Text style={styles.sectionTitle}>3. Data Sharing and Disclosure</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.paragraphSection}>
            - Your data may be shared in accordance with legal requirements or
            to protect our rights and the rights of others.
          </Text>
        </Text>

        <Text style={styles.sectionTitle}>4. Data Security</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.paragraphSection}>
            - We take the security of your data seriously and employ
            industry-standard measures to protect against unauthorized access,
            alteration, disclosure, or destruction.
          </Text>
        </Text>

        <Text style={styles.sectionTitle}>5. Your Choices and Rights</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.paragraphSection}>
            - You have the right to access, update, or delete your personal
            information at any time.
          </Text>
        </Text>

        <Text style={styles.sectionTitle}>6. Updates to This Policy</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.paragraphSection}>
            - We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. We encourage you to
            review this Policy periodically for any updates.
          </Text>
        </Text>

        <Text style={[styles.paragraphSection, { marginTop: 30 }]}>
          If you have any questions or concerns about our Privacy Policy or data
          practices, please contact us at{" "}
          <Text
            style={styles.link}
            onPress={() => Linking.openURL("mailto:info@muze-network.com")}
          >
            info@muze-network.com
          </Text>
        </Text>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#121212", // Dark mode background color
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
    color: "#FFFFFF", // White text for dark mode
    borderBottomWidth: 5,
    borderBottomColor: "#2a69a5", // Border gradient is simplified
    paddingBottom: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 20,
    color: "#FFFFFF",
    marginTop: 20,
  },
  paragraph: {
    paddingVertical: 10,
    color: "#B3B3B3", // Slightly dimmer color for text
  },
  paragraphSection: {
    fontWeight: "500",
    fontSize: 18,
    color: "#B3B3B3",
  },
  link: {
    backgroundColor: "transparent",
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "#f77599", // Gradient color effect replaced with solid
    fontSize: 18,
  },
});

export default PrivacyPolicy;
