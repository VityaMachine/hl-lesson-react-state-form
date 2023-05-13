import {
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import React, { Component } from "react";

import styles from "./styles";

export default class ColorPicker extends Component {
  state = {
    selectedColor: null,
  };

  handleListItemClick = (color) => {
    this.setState((prevState) => ({
      selectedColor: prevState.selectedColor !== color ? color : null,
    }));
  };

  render() {
    const { colorOptions } = this.props;

    return (
      <Container maxWidth={"sm"} sx={styles.mainContainer}>
        <Paper elevation={3} sx={styles.mainPaper}>
          <Typography variant={"h4"} sx={styles.title}>
            Color picker
          </Typography>

          <List sx={styles.colorList}>
            {colorOptions.map((option) => (
              <ListItem key={option.label} sx={styles.colorListItem}>
                <ListItemButton
                  selected={option.label === this.state.selectedColor}
                  sx={styles.colorListItemBtn(option)}
                  onClick={() => {
                    this.handleListItemClick(option.label);
                  }}
                >
                  <ListItemText
                    primary={option.label}
                    sx={styles.colorListItemBtnText}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    );
  }
}
