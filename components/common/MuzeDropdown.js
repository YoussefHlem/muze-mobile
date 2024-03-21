import { StyleSheet, Text, View } from "react-native";
import {
  SelectList,
  MultipleSelectList,
} from "react-native-dropdown-select-list";

const MuzeDropdown = ({ label, data, setSelected, isMulti, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {isMulti ? (
        <MultipleSelectList
          boxStyles={styles.dropdown}
          data={data}
          search={false}
          setSelected={setSelected}
          onSelect={onSelect}
        />
      ) : (
        <SelectList
          boxStyles={styles.dropdown}
          data={data}
          search={false}
          setSelected={setSelected}
          onSelect={onSelect}
        />
      )}
    </View>
  );
};

export default MuzeDropdown;

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  label: {
    color: "#fff",
    marginBottom: 5,
    fontSize: 15,
  },
  dropdown: {
    width: 350,
    color: "#fff",
    borderColor: "#fff",
  },
});
