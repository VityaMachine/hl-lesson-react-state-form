const styles = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    py: "20px",
  },

  formTextInput: {
    my: "15px",
    width: "350px",
  },
  redioLabel: {
    textAlign: "center",
  },
  radioGroup: {
    justifyContent: "space-around",
  },

  checkboxTitleLabel: {
    mb: "20px",
  },

  checkboxControlLabel: {
    pl: "90px",
  },

  errorRadioStyle: (genderError) => ({
    color: genderError && "error.main",
  }),
};

export default styles;
