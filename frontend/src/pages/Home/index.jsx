import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  CardActions,
  CardContent,
  List,
  ListItem,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { FaCode, FaMagic } from "react-icons/fa";
import BottomCard from "../../components/BottomCard";
import GradientButton from "../../components/GradientButton";
import LinkInput from "../../components/LinkInput";
import { instance } from "../../config/axios";
import { keyframes } from "@emotion/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LightButton from "../../components/LightButton";
import { TestContext } from "../../context/TestContext";

const steps = [
  {
    id: 1,
    text: "Share your website URL.",
  },
  {
    id: 2,
    text: "Receive tailored suggestions on integrating web3 seamlessly.",
  },
  {
    id: 3,
    text: "Get a one-click deploy contract for swift implementation.",
  },
];
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

function Home() {
  const navigate = useNavigate();
  const [inputLink, setInputLink] = useState("https://www.reddit.com/");
  const isTest = React.useContext(TestContext);
  console.log("isTest", isTest);

  const [loading, setLoading] = useState(false);

  const handleMagicButtonClick = async () => {
    setLoading(true);
    try {
      if (isTest) {
        // Simulate a 3-second loading delay if isTest is true
        await new Promise((resolve) => setTimeout(resolve, 7000));
      }
      const { data } = await instance.post(
        "/scrape?url=" + inputLink + `&is_test=${isTest}`
      );
      if (data?.response?.approaches && data.response.summary) {
        navigate("/options", {
          state: {
            options: data.response.approaches,
            summary: data.response.summary,
            url: inputLink,
          },
        });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      console.log(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      width="80%"
      mx="auto"
      height="calc(100vh - 4rem)"
    >
      <Box width="70%" mx="auto" pt={4} mb={3}>
        <img
          src="home.svg"
          style={{
            display: "block",
            width: "300px",
            margin: "auto",
          }}
          alt="Web2 --> Web3"
        />
        <LinkInput
          defaultValue={isTest ? inputLink : ""}
          isDisabled={isTest}
          onChange={(e) => setInputLink(e.target.value)}
        />
        <Typography align="center" variant="body1">
          Streamlined web3 integration made simple!
        </Typography>
      </Box>
      <BottomCard
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          borderRadius: "2rem",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
            height: "30rem",
            borderRadius: "2rem",
            transition: "opacity 1s ease-in-out", // Add a smooth transition effect
          }}
        >
          {loading ? (
            <>
              <Typography variant="h6" mb={2} fontWeight={700} align="center">
                Generating ideas!
              </Typography>
              <LinearProgress
                sx={{ width: "30%", borderRadius: "1rem", mt: 2 }}
              />
            </>
          ) : (
            <>
              <Stepper
                activeStep={-1}
                orientation="vertical"
                sx={{
                  color: "white",
                  overflow: "auto",
                }}
              >
                {steps.map(({ id, text }) => {
                  return (
                    <Step key={id}>
                      <StepLabel color="white">
                        <Typography variant="h6" color="white">
                          {text}
                        </Typography>
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <CardActions
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "100%",
                }}
              >
                <GradientButton
                  icon={<FaMagic />}
                  text="Start the Magic!"
                  onClick={handleMagicButtonClick}
                  disabled={loading}
                />
                <Box sx={{ display: "flex" }} mb={1}>
                  <img
                    src="creditIcon.svg"
                    alt="text"
                    style={{
                      display: "block",
                      width: "1.4rem",
                    }}
                  />
                  <Typography variant="body2" fontSize={12} px={1}>
                    1 Credit
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "30%",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "coloumn",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "auto",
                    }}
                  >
                    <Divider
                      sx={{ bgcolor: "white", width: "30%", height: "1px" }}
                    ></Divider>
                    <Typography variant="body2" fontSize={18} px={1}>
                      or
                    </Typography>
                    <Divider
                      sx={{ bgcolor: "white", width: "30%", height: "1px" }}
                    ></Divider>
                  </Box>
                  <LightButton
                    component={Link}
                    to={`/editor`}
                    text="Open in code editor"
                    icon={<FaCode />}
                    fullWidth
                  />
                </Box>
              </CardActions>
            </>
          )}
        </CardContent>
      </BottomCard>
    </Box>
  );
}

export default Home;
