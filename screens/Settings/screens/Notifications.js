import React from "react";
import { Modal, View, Text, StyleSheet, Pressable, Switch, ScrollView, Alert } from "react-native";
import { BlurView } from "expo-blur";
import { useTranslation } from "react-i18next";
import * as Notifications from "expo-notifications";
import Toast from "react-native-toast-message";

const Setting = ({ text, option, onToggle }) => {
  return (
    <View style={styles.settingContainer}>
      <Text style={styles.settingText}>{text}</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#1984FE" }}
        thumbColor={option ? "#fff" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={onToggle}
        value={option}
      />
    </View>
  );
};

const NotificationsComponent = ({ visible, setVisible }) => {
  const { t } = useTranslation();
  const [notificationOption, setNotificationOption] = React.useState(false);
  const [soundOption, setSoundOption] = React.useState(false);
  const [vibrateOption, setVibrateOption] = React.useState(false);
  const [appUpdatesOption, setAppUpdatesOption] = React.useState(false);
  const [billReminderOption, setBillReminderOption] = React.useState(false);
  const [promotionOption, setPromotionOption] = React.useState(false);
  const [discountAvailableOption, setDiscountAvailableOption] = React.useState(false);
  const [paymentRequestOption, setPaymentRequestOption] = React.useState(false);
  const [newServiceAvailableOption, setNewServiceAvailableOption] = React.useState(false);
  const [newTipsAvailableOption, setNewTipsAvailableOption] = React.useState(false);

  const handleNotificationToggle = async () => {
    if (!notificationOption) {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== "granted") {
          Alert.alert(t("Permission denied"), t("Please enable notifications in settings."));
          return;
        }
      } else {
        Toast.show({ type: "success", text1: "Notifications Enabled" });
      }
    }
    setNotificationOption(!notificationOption);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        setVisible(!visible);
      }}
    >
      <BlurView
        intensity={50}
        style={styles.absolute}
        experimentalBlurMethod="dimezisBlurView"
        tint="dark"
      />

      <View style={styles.centeredView}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Pressable onPress={() => setVisible(!visible)}>
              <Text style={styles.modalTitle}>{t("Back")}</Text>
            </Pressable>
            <Text style={styles.modalTitle}>{t("Edit profile")}</Text>
          </View>

          <View style={{ width: "100%" }}>
            <Text style={styles.sectionTitle}>{t("Common")}</Text>
            <Setting
              text={t("General Notification")}
              option={notificationOption}
              onToggle={handleNotificationToggle}
            />
            <Setting
              text={t("Sound")}
              option={soundOption}
              onToggle={() => setSoundOption(!soundOption)}
            />
            <Setting
              text={t("Vibrate")}
              option={vibrateOption}
              onToggle={() => setVibrateOption(!vibrateOption)}
            />
          </View>

          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              marginVertical: 25,
            }}
          />

          <View style={{ width: "100%" }}>
            <Text style={styles.sectionTitle}>{t("System & services update")}</Text>
            <Setting
              text={t("App updates")}
              option={appUpdatesOption}
              onToggle={() => setAppUpdatesOption(!appUpdatesOption)}
            />
            <Setting
              text={t("Bill Reminder")}
              option={billReminderOption}
              onToggle={() => setBillReminderOption(!billReminderOption)}
            />
            <Setting
              text={t("Promotion")}
              option={promotionOption}
              onToggle={() => setPromotionOption(!promotionOption)}
            />
            <Setting
              text={t("Discount Available")}
              option={discountAvailableOption}
              onToggle={() => setDiscountAvailableOption(!discountAvailableOption)}
            />
            <Setting
              text={t("Payment Request")}
              option={paymentRequestOption}
              onToggle={() => setPaymentRequestOption(!paymentRequestOption)}
            />
          </View>

          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              marginVertical: 25,
            }}
          />

          <View style={{ width: "100%" }}>
            <Text style={styles.sectionTitle}>{t("Others")}</Text>
            <Setting
              text={t("New Service Available")}
              option={newServiceAvailableOption}
              onToggle={() => setNewServiceAvailableOption(!newServiceAvailableOption)}
            />
            <Setting
              text={t("New Tips Available")}
              option={newTipsAvailableOption}
              onToggle={() => setNewTipsAvailableOption(!newTipsAvailableOption)}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    gap: 135,
    marginBottom: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22,
    padding: 40,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  settingText: {
    color: "#fff",
    fontSize: 18,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default NotificationsComponent;
