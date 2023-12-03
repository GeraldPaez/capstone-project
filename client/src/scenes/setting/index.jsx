import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Container,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

const changePasswordSchema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const changeLanguageSchema = yup.object().shape({
  language: yup.string().required("Language is required"),
});

const updatePersonalInfoSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
  role: yup.string().required("Role is required"),
});

const Settings = () => {
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);

  const handleChangePassword = async (values, { resetForm }) => {
    try {
      const response = await axios.post("/api/Auth", values);

      if (response.data.success) {
        setChangePasswordSuccess(true);
        resetForm();
      } else {
        console.error("Failed to change password:", response.data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
    }
  };

  const handleChangeLanguage = async (values, { resetForm }) => {
    try {
      const response = await axios.post("/api/change-language", values);

      if (response.data.success) {
        resetForm();
      } else {
        console.error("Failed to change language:", response.data.message);
      }
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const handleUpdatePersonalInfo = async (values, { resetForm }) => {
    try {
      const response = await axios.post("/api/update-personal-info", values);

      if (response.data.success) {
        resetForm();
      } else {
        console.error(
          "Failed to update personal information:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error updating personal information:", error);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Settings</Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={changePasswordSchema}
              onSubmit={handleChangePassword}
            >
              <Form>
                <Typography variant="h6">Change Password</Typography>
                <Field
                  as={TextField}
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText={
                    <Typography variant="caption" color="error">
                      {changePasswordSuccess
                        ? "Password changed successfully!"
                        : ""}
                    </Typography>
                  }
                />
                <Field
                  as={TextField}
                  label="New Password"
                  type="password"
                  name="newPassword"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Change Password
                </Button>
              </Form>
            </Formik>
          </Grid>

          <Grid item xs={12} md={6}>
            <Formik
              initialValues={{
                language: "",
              }}
              validationSchema={changeLanguageSchema}
              onSubmit={handleChangeLanguage}
            >
              {/* <Form>
                <Typography variant="h6">Change Language</Typography>
                <Field
                  as={TextField}
                  label="Language"
                  name="language"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Change Language
                </Button>
              </Form> */}
            </Formik>
          </Grid>

          <Grid item xs={12}>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                location: "",
                occupation: "",
                role: "",
              }}
              validationSchema={updatePersonalInfoSchema}
              onSubmit={handleUpdatePersonalInfo}
            >
              <Form>
                <Typography variant="h6">
                  Update Personal Information
                </Typography>
                <Field
                  as={TextField}
                  label="First Name"
                  name="firstName"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  label="Last Name"
                  name="lastName"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  label="Location"
                  name="location"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  label="Occupation"
                  name="occupation"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Field
                  as={TextField}
                  label="Role"
                  name="role"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Save
                </Button>
              </Form>
            </Formik>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Settings;
