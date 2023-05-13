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
  Typography,
  Autocomplete,
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


  handleCityChange = (e, newCity) => this.setState({
    formData: {
      ...this.state.formData,
      city: newCity
    }
  })

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

    const { isPasswordVisible } = this.state;

    return (
      <Paper>
        <form>
          <Container maxWidth="sm" sx={styles.formContainer}>
            <TextField
              name="username"
              value={username}
              onChange={this.handleInputChange}
              variant="outlined"
              label="Username"
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
            />
            <TextField
              name="email"
              value={email}
              onChange={this.handleInputChange}
              variant="outlined"
              label="Email"
              sx={styles.formTextInput}
            />

            <TextField
              value={age}
              onChange={this.handleInputChange}
              select
              label="Age"
              name="age"
              sx={styles.formTextInput}
              variant="outlined"
            >
              <MenuItem value="14-19">14-19</MenuItem>
              <MenuItem value="20-28">20-28</MenuItem>
              <MenuItem value="29-35">29-35</MenuItem>
              <MenuItem value="35-45">35-45</MenuItem>
              <MenuItem value="45+">45+</MenuItem>
            </TextField>

            <FormControl sx={styles.formTextInput}>
              <FormLabel id="gender-radio-select" sx={styles.redioLabel}>
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
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>

            <Autocomplete
              options={cities}
              inputValue={this.state.cityInput}
              onInputChange={(e, newValue) => (
                this.setState({
                  cityInput: newValue
                })
              )}
              value={city}
              onChange={this.handleCityChange}
              disableClearable
         
              sx={styles.formTextInput}
              renderInput={(params) => {
               return <TextField {...params} name="city" label="Select your city" variant="standard" />
              }
            
            }
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

            
          </Container>
        </form>
      </Paper>
    );
  }
}
