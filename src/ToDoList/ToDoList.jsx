import React, { Component } from "react";

import {
  Alert,
  AlertTitle,
  Snackbar,
  Fade,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./styles";

import { v4 as uuidv4 } from "uuid";

import TaskList from "./TaskList";
import AddTaskForm from "./AddTaskForm";

export default class ToDoList extends Component {
  state = {
    todos: [
      { id: "id-1", text: "Todo 1 message", completed: false },
      { id: "id-2", text: "Todo 2 message", completed: false },
      { id: "id-3", text: "Todo 3 message", completed: false },
      { id: "id-4", text: "Todo 4 message", completed: false },
    ],
    isNotify: null,
    openNotify: null,
  };

  addNewTask = (formData) => {
    if (formData.taskText.length < 1) {
      this.notificationOpenHandler(
        "error",
        "Task text must be longer then 0 symbols"
      );
      return;
    }

    this.setState((prevState) => ({
      todos: [
        { id: uuidv4(), text: formData.taskText, completed: formData.taskDone },
        ...prevState.todos,
      ],
    }));

    this.notificationOpenHandler("success", "Task added");
  };

  finishedTaskTogler = (e, id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.map((todo) =>
        todo.id !== id
          ? todo
          : {
              ...todo,
              completed: e.target.checked,
            }
      ),
    }));

    const newTaskStatus = !this.state.todos.find((el) => el.id === id)
      .completed;

    newTaskStatus
      ? this.notificationOpenHandler("success", "Task status changed to done")
      : this.notificationOpenHandler(
          "warning",
          "Task status changed to InProcess"
        );
  };

  deleteHandler = (id) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((todo) => todo.id !== id),
    }));

    this.notificationOpenHandler(
      "error",
      "Task successful deleted",
      <ClearIcon />
    );
  };

  editHandler = (id, updatedText) => {
    const oldText = this.state.todos.find((el) => el.id === id).text;

    oldText !== updatedText &&
      this.setState((prevState) => ({
        todos: prevState.todos.map((todo) =>
          todo.id !== id
            ? todo
            : {
                ...todo,
                text: updatedText,
              }
        ),
      }));

    oldText !== updatedText
      ? this.notificationOpenHandler(
          "info",
          "Task message text successful edited",
          <EditIcon />
        )
      : this.notificationOpenHandler("warning", "Task message text not edited");
  };

  notificationOpenHandler = (
    type = "info",
    text = "",
    icon,
    title,
    strongText
  ) => {
    this.setState({
      isNotify: {
        type,
        text,
        title,
        strongText,
        icon,
      },
      openNotify: true,
    });
  };

  handleCloseNotify = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({
      isNotify: null,
      openNotify: false,
    });
  };

  render() {
    const { todos, isNotify, openNotify } = this.state;
    return (
      <>
        {isNotify && (
          <Snackbar
            open={openNotify}
            autoHideDuration={2000}
            onClose={this.handleCloseNotify}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            TransitionComponent={Fade}
          >
            <Alert
              icon={isNotify.icon}
              severity={isNotify.type}
              onClose={this.handleCloseNotify}
            >
              {isNotify.title && <AlertTitle>{isNotify.title}</AlertTitle>}
              {isNotify.text}
              {isNotify.strongText && <strong>isNotify.strongText</strong>}
            </Alert>
          </Snackbar>
        )}

        <AddTaskForm onAddHandler={this.addNewTask} />

        <Paper sx={styles.paper}>
          <Container sx={styles.container}>
            <Typography>
              Total tasks: {todos.filter((el) => el.completed).length}
            </Typography>

            <Typography>Total tasks: {todos.length}</Typography>
          </Container>
        </Paper>

        <TaskList
          todos={todos}
          finishTaskHandler={this.finishedTaskTogler}
          onDeleteHandler={this.deleteHandler}
          editHandler={this.editHandler}
          notifyHandler={this.notificationOpenHandler}
        />
      </>
    );
  }
}
