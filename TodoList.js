import React from "react"
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity
} from "react-native"

const styles = StyleSheet.create({
    scrollView:{
        backgroundColor:"#EEE",
      },
      todoContainer:{
        flexDirection:"row",
        backgroundColor:"#FFF",
        padding:10,
        justifyContent:"space-between"
      }
})


export default TodoList = (props) => {
    return(
      <ScrollView style={styles.scrollView}>
            {
              props.todos.map((todo,index) => (
                <View key={todo+index} style={styles.todoContainer}>
                  <Text >{todo}</Text>
                  <TouchableOpacity
                    onPress={() => props.deleteTodo(index)}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))
            }
      </ScrollView>
    )
};