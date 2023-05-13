import { Box, Paper, Button } from "@mui/material";


function CounterControls(props) {

  return (
    <Paper
      elevation={0}
      sx={{
        width: "40%",
        display: "flex",
        justifyContent: "center",
        marginLeft: "30%",
        marginRight: "30%",
        marginBottom: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "70%",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <Button
          variant="contained"
          color="tealgrean"
          onClick={() => props.handleClick("decrease")}

        >
          Decrease
        </Button>
        <Button
          variant="contained"
          color="softred"
          onClick={() => props.handleClick("increase")}

        >
          Increase
        </Button>
      </Box>
    </Paper>
  );
}

export default CounterControls;
