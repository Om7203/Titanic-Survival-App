import React from "react";
import { Button, Stack } from "@mui/material";
import Title from "./Title";
import Paragraph from "./Paragraph";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <Stack
      component="section"
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        py: 10,
        mx: 6,
      }}
    >
      <Title
        text={'Prediction will be shown "Survived" or "Did not survive".'}
        textAlign={"center"}
      />
      <Paragraph
        text={
          "The survival calculator shall continuosly update the shown prediction after each input change, also contain a Reset button for the passenger input and will show a history of last 5 passenger with prediction Done."
        }
        maxWidth={"sm"}
        mx={0}
        textAlign={"center"}
      />
      <Button
        component={Link}
        to={"/Calculator"}
        variant="contained"
        type="submit"
        size="medium"
        sx={{
          fontSize: "0.9rem",
          textTransform: "capitalize",
          py: 2,
          px: 4,
          mt: 3,
          mb: 2,
          borderRadius: 0,
          backgroundColor: "#14192d",
          "&:hover": {
            backgroundColor: "#1e2a5a",
          },
        }}
      >
        Survival Calculator
      </Button>
    </Stack>
  );
};

export default GetStarted;
