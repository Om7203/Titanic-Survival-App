import React from "react";
import { Box, Grid, styled, Typography } from "@mui/material";
import Title from "./Title";
import TitanicImg from "../assets/Titanic_img.jpg";

import TitanicShipImg from "../assets/titanic_img2.jpg";

const Details = () => {
  const CustomGridItem = styled(Grid)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  });

  const CustomTypography = styled(Typography)({
    fontSize: "1.1rem",
    textAlign: "start",
    lineHeight: "1.5",
    color: "#515151",
    marginTop: "1.5rem",
  });

  return (
    <Grid
      id="explore-section"
      container
      spacing={{ xs: 4, sm: 4, md: 0 }}
      sx={{
        py: 10,
        px: 2,
      }}
    >
      <CustomGridItem item xs={12} sm={6} component="section">
        <Box
          component="article"
          sx={{
            px: 4,
          }}
        >
          <Title
            text={"1.Survival Calculator will redirect to a Form."}
            textAlign={"start"}
          />

          <CustomTypography>
            Where user can input data such as,
            <ul>
              <li>PClass: First, Second, Third</li>
              <li>Sex: Male or Female </li>
              <li>Age: 0-100</li>
              <li>Fare: 0-500 $</li>
              <li>Traveled Alone: Yes or No</li>
              <li>Embarked: Cherbourg, Queenstown, Southhampton</li>
            </ul>
          </CustomTypography>
        </Box>
      </CustomGridItem>

      <Grid item xs={12} sm={6}>
        <img
          src={TitanicImg}
          alt=""
          style={{
            width: "100%",
          }}
        />
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          order: { xs: 4, sm: 4, md: 3 },
        }}
      >
        <img
          src={TitanicShipImg}
          alt=""
          style={{
            width: "100%",
          }}
        />
      </Grid>

      <CustomGridItem
        item
        xs={12}
        sm={6}
        sx={{
          order: { xs: 3, sm: 3, md: 4 },
        }}
      >
        <Box
          component="article"
          sx={{
            px: 4,
          }}
        >
          <Title
            text={"2.Machine Learning models available for prediction."}
            textAlign={"start"}
          />
          <CustomTypography>
            Where user can choose any model for prediction,
            <ul>
              <li>Random Forest</li>
              <li>Decision Tree</li>
              <li>KNN</li>
              <li> Support Vector Machines</li>
              <li>Logistic Regression</li>
            </ul>
          </CustomTypography>
        </Box>
      </CustomGridItem>
    </Grid>
  );
};

export default Details;
