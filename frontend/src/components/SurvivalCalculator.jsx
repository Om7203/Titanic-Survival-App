import React, { useContext, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  MenuItem,
  Button,
  Container,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFormik } from "formik";
import axios from "axios";
import { survivalCalculatorSchema } from "../utils/validationSchema";
import UserContext from "../context/userContext";

const initialPassengerData = {
  title: "",
  name: "",
  pClass: "",
  sex: "",
  age: "",
  fare: "",
  traveledAlone: "",
  embarked: "",
  chooseModel: "",
};

const SurvivalCalculator = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: initialPassengerData,
    validateOnBlur: true,
    validationSchema: survivalCalculatorSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
  } = formik;

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    // Transform form data to match backend requirements
    const transformedData = {
      Title: formData.title,
      Pclass: formData.pClass === "First" ? 1 : formData.pClass === "Second" ? 2 : 3,
      Sex: formData.sex === "Male" ? 1 : 0,
      Age: parseInt(formData.age, 10), // Ensure age is an integer
      Fare: parseInt(formData.fare, 10), // Ensure fare is an integer
      IsAlone: formData.traveledAlone === "Yes" ? 1 : 0,
      Embarked: formData.embarked === "Cherbourg" ? 0 : formData.embarked === "Queenstown" ? 1 : 2,
      AgeClass: parseInt(formData.age, 10) * (formData.pClass === "First" ? 1 : formData.pClass === "Second" ? 2 : 3),
    };

    try {
      const response = await axios.post("http://localhost:8000/predict", {
        passenger: transformedData,
        model_names: [formData.chooseModel.replace(/ /g, "_").toLowerCase().replace(".pkl", "")],
      });
      const predictionResults = response.data.map(pred => ({
        model_name: pred.model_name,
        survived: pred.survival_probability > 0.5,
      }));

      setPredictions(predictionResults);

      // Store the formData and predictions correctly in userData context
      const newUserData = {
        formData,
        predictions: predictionResults,
      };

      // Update userData to keep only the last 5 entries
      setUserData(prevUserData => {
        const updatedUserData = [newUserData, ...prevUserData];
        if (updatedUserData.length > 5) {
          updatedUserData.pop();
        }
        return updatedUserData;
      });

      setLoading(false);
      handleReset();
    } catch (err) {
      console.error("Error submitting form:", err); // Log errors
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          border: "2px solid #14192d",
          borderRadius: "16px",
          padding: "2rem",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.7)",
          width: "100%",
          maxWidth: "600px",
          align: "center",
        }}
      >
        <Typography
          align="center"
          variant="h3"
          gutterBottom
          sx={{
            marginBottom: "2rem",
            color: "#14192d",
            letterSpacing: "0.1rem",
          }}
        >
          Survival Calculator
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Title"
                  value={values.title}
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                >
                  <MenuItem value="Mr.">Mr.</MenuItem>
                  <MenuItem value="Mrs.">Mrs.</MenuItem>
                  <MenuItem value="Miss">Miss</MenuItem>
                  <MenuItem value="Master">Master</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <TextField
                  name="name"
                  variant="outlined"
                  label="Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Sex"
                  value={values.sex}
                  name="sex"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.sex && !!errors.sex}
                  helperText={touched.sex && errors.sex}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="PClass"
                  value={values.pClass}
                  name="pClass"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pClass && !!errors.pClass}
                  helperText={touched.pClass && errors.pClass}
                >
                  <MenuItem value="First">First</MenuItem>
                  <MenuItem value="Second">Second</MenuItem>
                  <MenuItem value="Third">Third</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <TextField
                  name="age"
                  label="Age"
                  type="number"
                  value={values.age}
                  onChange={handleChange}
                  fullWidth
                  inputProps={{ min: "0", step: "1" }}  // Ensure integer input
                  onBlur={handleBlur}
                  error={touched.age && !!errors.age}
                  helperText={touched.age && errors.age}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  name="fare"
                  label="Fare"
                  type="number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  inputProps={{ min: "0", step: "1" }}  // Ensure integer input
                  value={values.fare}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.fare && !!errors.fare}
                  helperText={touched.fare && errors.fare}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Traveled Alone"
                  value={values.traveledAlone}
                  name="traveledAlone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.traveledAlone && !!errors.traveledAlone}
                  helperText={touched.traveledAlone && errors.traveledAlone}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Embarked"
                  value={values.embarked}
                  name="embarked"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.embarked && !!errors.embarked}
                  helperText={touched.embarked && errors.embarked}
                >
                  <MenuItem value="Cherbourg">Cherbourg</MenuItem>
                  <MenuItem value="Queenstown">Queenstown</MenuItem>
                  <MenuItem value="Southampton">Southampton</MenuItem>
                </TextField>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Choose Model"
                  value={values.chooseModel}
                  name="chooseModel"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.chooseModel && !!errors.chooseModel}
                  helperText={touched.chooseModel && errors.chooseModel}
                >
                  <MenuItem value="random_forest.pkl">Random Forest</MenuItem>
                  <MenuItem value="decision_tree.pkl">Decision Tree</MenuItem>
                  <MenuItem value="knn.pkl">KNN</MenuItem>
                  <MenuItem value="svm.pkl">Support Vector Machines</MenuItem>
                  <MenuItem value="logistic_regression.pkl">Logistic Regression</MenuItem>
                </TextField>
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <Button
                variant="contained"
                fullWidth
                type="submit"
                size="medium"
                sx={{
                  fontSize: "0.9rem",
                  textTransform: "capitalize",
                  py: 2,
                  mt: 3,
                  mb: 2,
                  borderRadius: 0,
                  backgroundColor: "#14192d",
                  "&:hover": {
                    backgroundColor: "#1e2a5a",
                  },
                }}
                disabled={loading}
              >
                {loading ? "Predicting..." : "Submit"}
              </Button>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <Button
                variant="outlined"
                onClick={handleReset}
                fullWidth
                startIcon={<DeleteIcon />}
                sx={{
                  fontSize: "0.9rem",
                  textTransform: "capitalize",
                  py: 2,
                  mt: 3,
                  mb: 2,
                  borderRadius: 0,
                  borderColor: "#14192d",
                  color: "#14192d",
                  "&:hover": {
                    borderColor: "#1e2a5a",
                    color: "#1e2a5a",
                  },
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
        {predictions && (
          <Box mt={3}>
            <Typography variant="h6">Prediction Results:</Typography>
            {predictions.map((prediction, index) => (
              <Typography key={index}>
                {prediction.model_name}: {prediction.survived ? "Survived" : "Did not survive"}
              </Typography>
            ))}
          </Box>
        )}
        {error && (
          <Box mt={3}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default SurvivalCalculator;
