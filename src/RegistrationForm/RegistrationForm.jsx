import React, { Component } from "react";

import {
  Paper,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Grid,
  FormHelperText,
  Autocomplete,
  Button,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import styles from "./styles";

const cities = [
  "Kyiv",
  "Kharkiv",
  "Odesa",
  "Dnipro",
  "Donetsk",
  "Zaporizhzhia",
  "Kryvyi Rih",
  "Mykolaiv",
  "Cherkasy",
  "Lugansk",
  "Vinnytsia",
];

export default class RegistrationForm extends Component {
  state = {
    formData: {
      username: "",
      password: "",
      repassword: "",
      email: "",
      age: "",
      gender: "",
      city: cities[0],
      activities: {
        studing: false,
        sport: false,
        business: false,
        gaming: false,
        gardening: false,
      },
    },

    errorsData: {
      usernameError: false,
      passwordError: false,
      emailError: false,
      ageError: false,
      genderError: false,
    },

    cityInput: "",
    isPasswordVisible: false,
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    });
  };

  handleCityChange = (e, newCity) =>
    this.setState({
      formData: {
        ...this.state.formData,
        city: newCity,
      },
    });

  handleCheckBoxChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        activities: {
          ...this.state.formData.activities,
          [e.target.name]: e.target.checked,
        },
      },
    });
  };

  handleChangeVisiblePassword = () => {
    this.setState((prevState) => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };

  handleValidateData = () => {
    const { username, password, repassword, email, age, gender } =
      this.state.formData;
    const passRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    this.setState({
      errorsData: {
        usernameError: username.length < 8,
        passwordError: !passRegex.test(password) || password !== repassword,
        emailError: !emailRegex.test(email),
        ageError: age.length < 1,
        genderError: gender.length < 1,
      },
    });

    return (
      username.length < 8 ||
      !passRegex.test(password) ||
      password !== repassword ||
      !emailRegex.test(email) ||
      age.length < 1 ||
      gender.length < 1
    );
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const isError = this.handleValidateData();

    if (isError) {
      return;
    }

    alert(JSON.stringify(this.state.formData));
  };

  handleResetFieldError = (stateErrorName) => {
    this.setState({
      errorsData: {
        ...this.state.errorsData,
        [stateErrorName]: false,
      },
    });
  };

  render() {
    const {
      username,
      password,
      repassword,
      email,
      age,
      gender,
      city,
      activities,
    } = this.state.formData;

    const { usernameError, passwordError, emailError, ageError, genderError } =
      this.state.errorsData;

    const { isPasswordVisible } = this.state;

    return (
      <Paper>
        <form onSubmit={this.handleFormSubmit}>
          <Container maxWidth="sm" sx={styles.formContainer}>
            <TextField
              name="username"
              value={username}
              onChange={this.handleInputChange}
              variant="outlined"
              label="Username"
              error={usernameError}
              helperText={
                usernameError &&
                "Username length must be equal or more then 8 symbols"
              }
              onClick={
                usernameError &&
                (() => this.handleResetFieldError("usernameError"))
              }
              sx={styles.formTextInput}
            />

            <TextField
              name="password"
              value={password}
              onChange={this.handleInputChange}
              variant="outlined"
              label="Enter password"
              sx={styles.formTextInput}
              type={isPasswordVisible ? "text" : "password"}
              error={passwordError}
              helperText={
                passwordError &&
                "Wrong password or repeat password. Pass must include lowercase, uppercase and special sybmol. Length must be over 8 symbols"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.handleChangeVisiblePassword}>
                      {this.state.isPasswordVisible ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onClick={
                passwordError &&
                (() => this.handleResetFieldError("passwordError"))
              }
            />

            <TextField
              name="repassword"
              value={repassword}
              onChange={this.handleInputChange}
              variant="outlined"
              label="Repeat password"
              sx={styles.formTextInput}
              type={isPasswordVisible ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={this.handleChangeVisiblePassword}>
                      {this.state.isPasswordVisible ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={passwordError}
              onClick={
                passwordError &&
                (() => this.handleResetFieldError("passwordError"))
              }
            />
            <TextField
              name="email"
              value={email}
              onChange={this.handleInputChange}
              variant="outlined"
              label="Email"
              sx={styles.formTextInput}
              error={emailError}
              helperText={emailError && "Wrong email"}
              onClick={
                emailError && (() => this.handleResetFieldError("emailError"))
              }
            />

            <TextField
              value={age}
              onChange={this.handleInputChange}
              select
              label="Age"
              name="age"
              sx={styles.formTextInput}
              variant="outlined"
              error={ageError}
              helperText={ageError && "Please select your age"}
              onClick={
                ageError && (() => this.handleResetFieldError("ageError"))
              }
            >
              <MenuItem value="14-19">14-19</MenuItem>
              <MenuItem value="20-28">20-28</MenuItem>
              <MenuItem value="29-35">29-35</MenuItem>
              <MenuItem value="35-45">35-45</MenuItem>
              <MenuItem value="45+">45+</MenuItem>
            </TextField>

            <FormControl sx={styles.formTextInput}>
              <FormLabel
                id="gender-radio-select"
                sx={styles.redioLabel}
                error={genderError}
              >
                Gender
              </FormLabel>
              <RadioGroup
                aria-labelledby="gender-radio-select"
                name="gender"
                value={gender}
                onChange={this.handleInputChange}
                row
                sx={styles.radioGroup}
              >
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={styles.errorRadioStyle(genderError)}
                      onClick={() => this.handleResetFieldError("genderError")}
                    />
                  }
                  label="Male"
                  sx={styles.errorRadioStyle(genderError)}
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={styles.errorRadioStyle(genderError)}
                      onClick={() => this.handleResetFieldError("genderError")}
                    />
                  }
                  label="Female"
                  sx={styles.errorRadioStyle(genderError)}
                />
              </RadioGroup>
              {genderError && (
                <FormHelperText sx={styles.errorRadioStyle(genderError)}>
                  Select your gender
                </FormHelperText>
              )}
            </FormControl>

            <Autocomplete
              options={cities}
              inputValue={this.state.cityInput}
              onInputChange={(e, newValue) =>
                this.setState({
                  cityInput: newValue,
                })
              }
              value={city}
              onChange={this.handleCityChange}
              disableClearable
              sx={styles.formTextInput}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    name="city"
                    label="Select your city"
                    variant="standard"
                  />
                );
              }}
            />

            <FormLabel sx={styles.checkboxTitleLabel}>
              Choose your activities:
            </FormLabel>
            <FormGroup>
              <Grid container spacing={2}>
                {Object.keys(activities).map((el) => (
                  <Grid key={el} item xs={6}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={activities[el]}
                          name={el}
                          onChange={this.handleCheckBoxChange}
                        />
                      }
                      label={el}
                      sx={styles.checkboxControlLabel}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>

            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                my: "20px",
              }}
            >
              Submit
            </Button>
          </Container>
        </form>
      </Paper>
    );
  }
}
