import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import GradientButton from "../../components/GradientButton";
import Editor from "@monaco-editor/react";
import { GrDeploy } from "react-icons/gr";
import { FaMagic } from "react-icons/fa";
import { LuHardHat } from "react-icons/lu";
import LightButton from "../../components/LightButton";
import YellowButton from "../../components/YellowButton";
import { FaCode, FaDownload } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { instance } from "../../config/axios";
import { encode } from "base-64";
import axios from "axios";
import { db } from "../../config/firebase";
import { AppContext } from "../../context/AppContext";
import { TestContext } from "../../context/TestContext";
const tempSteps = [
  {
    id: "01",
    text: "Open Remix IDE",
  },
  {
    id: "02",
    text: 'Click "+" in the file explorer, name the file according to contract name(e.g., Contract.sol).',
  },
  {
    id: "03",
    text: "Copy contract code, paste into the new file.",
  },
  {
    id: "04",
    text: 'Go to "Solidity" tab, select compiler version, click "Compile".',
  },
  {
    id: "05",
    text: 'Switch to "Deploy & Run Transactions" tab, click "Deploy".',
  },
  {
    id: "06",
    text: "Find deployed contract, expand, interact with functions",
  },
  {
    id: "07",
    text: 'Deploy contract, set value using a setter function in "Deployed Contracts" with entered parameter',
  },
  {
    id: "08",
    text: "Get value using a getter function in 'Deployed Contracts'",
  },
  {
    id: "09",
    text: 'In "Events" section, observe emitted events.',
  },
  {
    id: "10",
    text: "If present, test modifiers like onlyOwner.",
  },
];

function EditorPage() {
  const { user } = useContext(AppContext);
  const { state } = useLocation();
  const [inputQuestions, setInputQuestions] = useState("");
  const [code, setCode] = useState("");
  const [summary, setSummary] = useState("");
  const [tabsLayout, setTabsLayout] = useState([25, 45, 30]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [contractName, setContractName] = useState("");
  const isTest = React.useContext(TestContext);


  const handleDownloadHardhat = async () => {
    axios
      .post("http://127.0.0.1:5001/", {
        code: code,
        testing: "",
        contractName: "VotingSystem",
      })
      .then((res) => {
        console.log(res);
        console.log(state?.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onTabClick = async () => {
    try {
      const response = await instance.post("generate/code", {
        approach_heading: state?.selectedOption?.heading,
        approach_content: state?.selectedOption?.content,
        user_approach: inputQuestions,
        is_test: isTest,
      });
      setCode("//" + response?.data?.response?.solidity_code);
      setSummary(response?.data?.response?.details?.additional_notes);
      updateDoc(doc(db, "users", user.address), {
        snippet: {
          approach_heading: state?.selectedOption?.heading,
          approach_content: state?.selectedOption?.content,
          user_approach: inputQuestions,
          solidity_code: response?.data?.response?.solidity_code,
          details: response?.data?.response?.details?.additional_notes,
        },
      });
      if (tabsLayout[0] === 25) {
        setTabsLayout([5, 65, 30]);
        setIsDisabled(false);
      } else if (tabsLayout[0] === 5) {
        setTabsLayout([25, 45, 30]);
        setIsDisabled(true);
      }
    } catch (error) {
      enqueueSnackbar("Unable to send request", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("code", code);
    localStorage.setItem("contractName", contractName);
  }, [code, contractName]);

  return (
    <Box
      sx={{
        height: "calc(100vh - 4rem)",
        width: "100vw",
        padding: "1rem",
        margin: "auto",
        display: "flex",
      }}
    >
      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.20)",
          background: "linear-gradient(180deg, #2B243C 0%, #0B031E 100%)",
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          height: "100%",
          padding: "0.5rem",
        }}
      >
        <Box
          width={tabsLayout[0] + "%"}
          height="100%"
          display="flex"
          justifyContent="space-evenly"
          alignItems="stretch"
          flexDirection="column"
          sx={{
            transition: "all 0.3s ease",
          }}
        >
          <Box
            sx={{
              borderRadius: 1,
              border: "1px solid #EEEEF0",
              background: "rgba(255, 255, 255, 0.10)",
              p: 2,
              height: "100%",
            }}
          >
            {tabsLayout[0] === 25 && (
              <>
                <Typography fontSize={18} fontWeight="600">
                  Approach Selected
                </Typography>
                <Typography fontSize={13}>
                  {state?.selectedOption?.content}
                </Typography>
              </>
            )}
          </Box>
          <Box
            sx={{
              mt: 1,
              borderRadius: 1,
              border: "1px solid #2E3C51",
              background: "rgba(255, 255, 255, 0.05)",
              height: "100%",
              p: 2,
            }}
          >
            {tabsLayout[0] === 25 && (
              <Box height="100%">
                <Typography variant="body" fontWeight={600} align="center">
                  What features do you want your smart contract to implement?
                </Typography>
                <Box height="80%" mt={1}>
                  <TextField
                    placeholder="Enter here..."
                    fullWidth
                    multiline
                    minRows={9}
                    onChange={(e) => setInputQuestions(e.target.value)}
                    value={inputQuestions}
                    sx={{
                      height: "100%",
                      overflow: "auto",
                      background: "rgba(255, 255, 255, 0.10)",
                      borderRadius: 1,
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
          {tabsLayout[0] === 25 ? (
            <Box mt={1}>
              <GradientButton
                onClick={onTabClick}
                text="Generate Code"
                icon={<FaMagic />}
                fullWidth
                styles={{
                  borderRadius: 1,
                }}
              />
            </Box>
          ) : (
            <Box mt={1}>
              <Button
                onClick={onTabClick}
                sx={{
                  borderRadius: 1,
                  background: `var(--brand-mix, conic-gradient(
                from 180deg at 50% 50%,
                #b52bba 4.666563235223293deg,
                #a12cbc 23.647727966308594deg,
                #8c2ebe 44.85525995492935deg,
                #792fbf 72.45651304721832deg,
                #6c30c0 82.50000178813934deg,
                #4b32c3 127.99007892608643deg,
                #5831c2 160.968976020813deg,
                #6330c1 178.45529437065125deg,
                #742fc0 189.47770357131958deg,
                #8d2dbe 202.95226335525513deg,
                #a62cbc 230.65982580184937deg,
                #b92aba 251.35178089141846deg,
                #d029b8 276.4414644241333deg,
                #ec27b6 306.45145654678345deg,
                #c729b9 331.67617321014404deg
              )
            )`,
                  boxShadow: "0px 0px 60px 0px rgba(236, 39, 182, 0.6)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                  width: "100%",
                  height: "100%",
                  // add on hover
                }}
              >
                <MdArrowForwardIos color="#fff" />
              </Button>
            </Box>
          )}
        </Box>
        <Divider
          orientation="vertical"
          sx={{
            ml: 1,
            bgcolor: "white",
          }}
        />
        <Box
          width={tabsLayout[1] + "%"}
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="stretch"
          flexDirection="column"
          px={1}
          sx={{
            transition: "all 0.3s ease",
          }}
        >
          <Box
            sx={{
              flex: 1,
              borderRadius: 1,
              border: "1px solid #EEEEF0",
              background: "#1D172B",
              mb: 1,
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Editor
              height="100%"
              defaultLanguage="sol"
              value={code || "// Code goes here"}
              theme="vs-dark"
              onChange={(value) => setCode(value)}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-evenly"
            alignItems="stretch"
            sx={{
              gap: 1,
            }}
          >
            <YellowButton
              text="Download Hardhat"
              fullWidth
              icon={<LuHardHat color="black" />}
              onClick={() => handleDownloadHardhat()}
            />
          </Box>
        </Box>
        <Box
          width={tabsLayout[2] + "%"}
          display="flex"
          justifyContent="center"
          alignItems="stretch"
          flexDirection="column"
          height="100%"
        >
          <Box
            sx={{
              borderRadius: 1,
              border: "1px solid #2E3C51",
              background: "rgba(255, 255, 255, 0.05)",
              height: "25rem",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              pt: 2,
            }}
          >
            <Typography fontSize={18} fontWeight="600" align="center">
              Steps to test it on RemixIDE
            </Typography>
            <Box
              px={2}
              py={5}
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="space-between"
            >
              <Stepper
                activeStep={-1}
                orientation="vertical"
                sx={{
                  color: "white",
                  overflow: "auto",
                }}
              >
                {tempSteps.map(({ id, text }) => {
                  return (
                    <Step key={id}>
                      <StepLabel color="white">
                        <Box color="white">{text}</Box>
                      </StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              <LightButton
                component={Link}
                to={`https://remix.ethereum.org/?#code=${encode(
                  code
                )}&autoCompile=true`}
                target="_blank"
                text="Open in Remix IDE"
                icon={<FaCode />}
                fullWidth
              />
            </Box>
          </Box>
          <Box
            my={1}
            sx={{
              borderRadius: 1,
              border: "1px solid #EEEEF0",
              background: "rgba(255, 255, 255, 0.10)",
              p: 2,
              height: "calc(100% - 20rem)",
              overflow: "auto",
            }}
          >
            <Typography fontSize={18} fontWeight="600">
              Contract Summary
            </Typography>
            <Typography fontSize={13}>{summary}</Typography>
          </Box>
          <GradientButton
            icon={<GrDeploy />}
            text="Magic Deploy"
            fullWidth
            isDisabled={isDisabled}
            styles={{
              borderRadius: 1,
              height: "2.5rem",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default EditorPage;
