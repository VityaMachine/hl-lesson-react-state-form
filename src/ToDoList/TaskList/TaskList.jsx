import React, { Component } from "react";
import { TransitionGroup } from "react-transition-group";

import styles from "./styles";

import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Paper,
  // Collapse,
  // Slide ,
  Grow 
} from "@mui/material";

import TodoListControls from "../TodoListControls";

export default class TaskList extends Component {
  state = {
    editingId: null,
    editedText: null,
  };

  editTaskBtnHandler = (id, currentText) => {
    this.setState({
      editingId: id,
      editedText: currentText,
    });
  };

  setEditingText = (e) => {
    this.setState({
      editedText: e.target.value,
    });
  };

  setNewTaskText = () => {
    const { editingId, editedText } = this.state;

    if (editedText.length === 0) {
      this.props.notifyHandler(
        "warning",
        "Task text message must be longer then 0 symbols",
        undefined,
        "No message"
      );
      return;
    }

    this.props.editHandler(editingId, editedText);
  };

  onBlurHandler = () => {
    this.setNewTaskText();
    this.setState({
      editingId: null,
      editedText: null,
    });
  };

  render() {
    const { editingId } = this.state;

    return (
      <>
        <List>
          <TransitionGroup>
            {this.props.todos.map((el) => {
              const { id, text, completed } = el;

              return (
                <Grow key={id}> 
                {/*<Slide direction="left" key={id} mountOnEnter unmountOnExit> */}
                {/* <Collapse key={id}> */}
                  <ListItem>
                    <Paper elevation={3} sx={styles.listItemPaper}>
                      {editingId !== id ? (
                        <ListItemText primary={text} />
                      ) : (
                        <TextField
                          id="standard-basic"
                          label="Change task text"
                          variant="standard"
                          value={this.state.editedText}
                          onChange={this.setEditingText}
                          onBlur={this.onBlurHandler}
                          sx={{
                            flexGrow: 0.9,
                          }}
                        />
                      )}

                      <TodoListControls
                        finishTaskHandler={this.props.finishTaskHandler}
                        editTaskBtnHandler={this.editTaskBtnHandler}
                        onBlurHandler={this.onBlurHandler}
                        onDeleteHandler={this.props.onDeleteHandler}
                        id={id}
                        text={text}
                        completed={completed}
                        editingId={editingId}
                      />
                    </Paper>
                  </ListItem>
                {/* </Collapse> */}
                {/*</Slide>*/}
                </Grow>
              );
            })}
          </TransitionGroup>
        </List>
      </>
    );
  }
}
