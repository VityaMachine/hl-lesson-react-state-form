import { Box, Checkbox, IconButton } from "@mui/material";

import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import HighlightOffTwoToneIcon from "@mui/icons-material/HighlightOffTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";

import styles from "./styles";

export default function TodoListControls({
  id,
  text,
  completed,
  finishTaskHandler,
  editTaskBtnHandler,
  onBlurHandler,
  onDeleteHandler,
  editingId,
}) {
  return (
    <Box sx={styles.listItemControlsBox}>
      <Checkbox
        color="success"
        checked={completed}
        onChange={(e) => finishTaskHandler(e, id)}
      />

      {editingId !== id ? (
        <IconButton onClick={() => editTaskBtnHandler(id, text)}>
          <EditTwoToneIcon color="primary" />
        </IconButton>
      ) : (
        <IconButton onClick={onBlurHandler}>
          <CheckCircleTwoToneIcon color="success" />
        </IconButton>
      )}

      <IconButton onClick={() => onDeleteHandler(id, text)}>
        <HighlightOffTwoToneIcon color="error" />
      </IconButton>
    </Box>
  );
}
