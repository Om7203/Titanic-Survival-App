import React from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import TitanicShipImg from "../assets/titanic_ship_img.png";

const Header = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(1),
    backgroundColor: "#ffa500",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const BoxText = styled(Box)(({ theme }) => ({
    flex: "1",
    paddingLeft: theme.spacing(8),
    [theme.breakpoints.down("md")]: {
      flex: "2",
      textAlign: "center",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

  const handleExplore = () => {
    const element = document.getElementById("explore-section");
    element?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <CustomBox component="header">
      <BoxText component="section">
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            color: "#fff",
          }}
        >
          Will You Survive the Titanic? Find Out Now!
        </Typography>

        <Typography
          variant="p"
          component="p"
          sx={{
            py: 3,
            lineHeight: 1.6,
            color: "#fff",
          }}
        >
          Uncover Your Titanic Fate! Explore Whether You'd Survive the Titanic
          Disaster Using This Tool, Analyzing Key Factors.
        </Typography>

        <Box>
          <Button
            onClick={handleExplore}
            variant="contained"
            sx={{
              mr: 2,
              px: 4,
              py: 1,
              fontSize: "0.9rem",
              textTransform: "capitalize",
              borderRadius: 0,
              borderColor: "#14192d",
              color: "#fff",
              backgroundColor: "#14192d",
              "&&:hover": {
                backgroundColor: "#343a55",
              },
              "&&:focus": {
                backgroundColor: "#343a55",
              },
            }}
          >
            explore
          </Button>
        </Box>
      </BoxText>

      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            flex: "1",
            paddingTop: "30px",
            alignSelf: "center",
          },
          [theme.breakpoints.up("md")]: {
            flex: "2",
            alignSelf: "flex-end",
          },
        })}
      >
        <img
          src={TitanicShipImg}
          alt="headerImg"
          style={{
            width: "80%",
            maxHeight: "80vh",
            float: "inline-end",
            mixBlendMode: "darken",
          }}
        />
      </Box>
    </CustomBox>
  );
};

export default Header;
