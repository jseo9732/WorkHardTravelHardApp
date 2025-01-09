import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { theme } from "@/colors";
import { useState } from "react";

export default function HomeScreen() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const travel = () => setWorking(false);
  const work = () => setWorking(true);

  const onChangeText = (payload) => {
    setText(payload);
  };
  const addTodo = () => {
    if (text === "") {
      return;
    }
    const newTodos = { ...toDos, [Date.now()]: { text, work: working } };
    setToDos(newTodos);
    setText("");
  };
  console.log(toDos);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text
            style={{ ...styles.btnText, color: working ? "white" : theme.grey }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text
            style={{
              ...styles.btnText,
              color: !working ? "white" : theme.grey,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder={
          working ? "할 일을 입력하세요." : "가고 싶은 곳을 입력하세요."
        }
        returnKeyType="done"
        onSubmitEditing={addTodo}
        onChangeText={onChangeText}
        value={text}
        placeholderTextColor={"lightgrey"}
        style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key) => (
          <View style={styles.toDo} key={key}>
            <Text style={styles.toDoText}> {toDos[key].text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: 20 },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  btnText: { fontSize: 38, fontWeight: "600" },
  input: {
    backgroundColor: "white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo: {
    backgroundColor: theme.toDoBg,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
