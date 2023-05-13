// import { withFormik } from "formik";
import { useFormik } from "formik";

import {
  Paper,
  Container,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
} from "@mui/material";

import styles from "./styles";

export default function AddTaskForm({ onAddHandler }) {
  const formik = useFormik({
    initialValues: {
      taskText: "",
      taskDone: false,
    },
    onSubmit: (values, { resetForm }) => {
      onAddHandler(values);
      resetForm();
    },
  });

  return (
    <Paper elevation={1} sx={styles.paper}>
      <Container sx={styles.container}>
        <Typography variant="h5" sx={styles.title}>
          Add task form
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Container sx={styles.formContainer}>
            <Container sx={styles.formInputsContainer}>
              <TextField
                label="New task text"
                variant="standard"
                sx={styles.textInputs}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.taskText}
                name="taskText"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="taskDone"
                    onChange={formik.handleChange}
                    value={formik.values.taskDone}
                  />
                }
                label="Is task done???"
                labelPlacement="start"
              />
            </Container>

            <Button variant="contained" color="success" type="submit">
              Add new task
            </Button>
          </Container>
        </form>
      </Container>
    </Paper>
  );
}
