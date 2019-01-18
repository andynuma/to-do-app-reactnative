/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import TodoList from "./TodoList"

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    newTodo:"",
    todos:[],
  }

  constructor(props){
    super(props);
    this.loadTodo();
  }

  onChangeText(newTodo) {
    this.setState({newTodo});
  }

  onPressAdd(){
    // this.setState({todos})
    console.log("pressed")
    const { newTodo } = this.state;
    this.setState({
      newTodo:"",
      todos:[newTodo, ...this.state.todos],
    }, () => this.storeTodo())
  }

  deleteTodo = (index) =>  {
    this.setState({
      todos:this.state.todos.filter((todo,i) => i !== index)
    }, () =>  this.storeTodo());
  }

  storeTodo() {
    const str = JSON.stringify(this.state.todos);
    AsyncStorage.setItem("todos", str)
  }

  loadTodo() {
    AsyncStorage.getItem("todos").then((str) => {
      const todos = str ? JSON.parse(str) : []
      this.setState({todos});
    })
  }

  render() {
    console.log(this.state)
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.newTodo}
          style={styles.form}
          onChangeText={text => this.onChangeText(text)}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>this.onPressAdd()}
        >
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
        <TodoList todos={this.state.todos} deleteTodo={(index) => this.deleteTodo(index)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:50,
  },
  form:{
    backgroundColor:"#EEE",
    padding:10
  },
  addButton:{
    backgroundColor:"#333",
    padding:14,
    borderRadius:4,
    marginTop:10
  },
  addButtonText:{
    color:"#FFF",
    textAlign:"center",
    fontWeight:"bold"
  },
});
