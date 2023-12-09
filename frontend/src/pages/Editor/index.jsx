import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import GradientButton from "../../components/GradientButton";
import Editor from "@monaco-editor/react";

import { FaMagic } from "react-icons/fa";
import { LuHardHat } from "react-icons/lu";

import LightButton from "../../components/LightButton";
import YellowButton from "../../components/YellowButton";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { instance } from "../../config/axios";
import { encode } from "base-64";

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
  const { state } = useLocation();
  const [inputQuestions, setInputQuestions] = useState("");
  const [code, setCode] = useState("");
  const [tabsLayout, setTabsLayout] = useState([33, 33, 33]);

  const onTabClick = async () => {
    try {
      const response = await instance.post("generate/code", {
        approach_heading: state?.selectedOption?.heading,
        approach_content: state?.selectedOption?.content,
        user_approach: inputQuestions,
        is_test: true,
      });
      setCode(response?.data?.response?.code);
      if (tabsLayout[0] === 33) {
        setTabsLayout([4, 76, 20]);
      } else if (tabsLayout[0] === 4) {
        setTabsLayout([33, 33, 33]);
      }
    } catch (error) {
      enqueueSnackbar("Unable to send request", {
        variant: "error",
      });
    }
  };
  return (
    <Box width="96vw" height="calc(100vh - 8rem)" margin="auto">
      <Box
        sx={{
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.20)",
          background: "linear-gradient(180deg, #2B243C 0%, #0B031E 100%)",
          p: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "stretch",
          height: "100%",
        }}
      >
        <Box
          width={tabsLayout[0] + "%"}
          height="100%"
          display="flex"
          justifyContent="space-evenly"
          alignItems="stretch"
          flexDirection="column"
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
            {tabsLayout[0] === 33 && (
              <>
                <Typography fontSize={18} fontWeight="bold">
                  Approach Selected
                </Typography>
                <Typography fontSize={16}>
                  {state?.selectedOption?.content}
                </Typography>
              </>
            )}
          </Box>
          <Box
            sx={{
              mt: 2,
              borderRadius: 1,
              border: "1px solid #2E3C51",
              background: "rgba(255, 255, 255, 0.05)",
              height: "100%",
            }}
          >
            {tabsLayout[0] === 33 && (
              <>
                <Typography
                  mt={2}
                  fontSize={18}
                  fontWeight="bold"
                  align="center"
                >
                  What features do you want your smart contract to implement?
                </Typography>
                <Box px={1} pt={1} height="100%">
                  <TextField
                    placeholder="Enter here..."
                    fullWidth
                    multiline
                    minRows={9}
                    onChange={(e) => setInputQuestions(e.target.value)}
                    value={inputQuestions}
                    sx={{
                      height: "100%",
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
          {tabsLayout[0] === 33 ? (
            <Box mt={2}>
              <GradientButton
                onClick={onTabClick}
                text="Generate Code"
                icon={<FaMagic />}
                fullWidth
              />
            </Box>
          ) : (
            <Button
              onClick={onTabClick}
              sx={{
                display: "flex",
                my: 2,
                padding: "8px",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "10px",
                height: 100,
                background:
                  "var(--brand-mix, conic-gradient(from 180deg at 50% 50%, #B52BBA 4.666563235223293deg, #A12CBC 23.647727966308594deg, #8C2EBE 44.85525995492935deg, #792FBF 72.45651304721832deg, #6C30C0 82.50000178813934deg, #4B32C3 127.99007892608643deg, #5831C2 160.968976020813deg, #6330C1 178.45529437065125deg, #742FC0 189.47770357131958deg, #8D2DBE 202.95226335525513deg, #A62CBC 230.65982580184937deg, #B92ABA 251.35178089141846deg, #D029B8 276.4414644241333deg, #EC27B6 306.45145654678345deg, #C729B9 331.67617321014404deg))",
              }}
            >
              <FaMagic color="#fff" />
            </Button>
          )}
        </Box>
        <Box
          width={tabsLayout[1] + "%"}
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="stretch"
          flexDirection="column"
          px={1}
        >
          <Box
            sx={{
              flex: 1,
              borderRadius: 1,
              border: "1px solid #EEEEF0",
              background: "#1D172B",
              p: 2,
              mb: 1,
              height: "100%",
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
            my={2}
          >
            <LightButton text="Magic Deploy" icon={<FaMagic />} fullWidth />
            <YellowButton
              text="Download Hardhat"
              fullWidth
              icon={<LuHardHat color="black" />}
            />
          </Box>
        </Box>
        <Box
          width={tabsLayout[2] + "%"}
          display="flex"
          justifyContent="center"
          alignItems="stretch"
          flexDirection="column"
        >
          <Box
            sx={{
              borderRadius: 1,
              border: "1px solid #2E3C51",
              background: "rgba(255, 255, 255, 0.05)",
              height: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              pt: 2,
            }}
          >
            <Typography fontSize={18} fontWeight="bold" align="center">
              Steps to test it on RemixIDE
            </Typography>
            <Box
              px={2}
              py={4}
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
              <GradientButton
                component={Link}
                to={`https://remix.ethereum.org/?#code=${encode(
                  code
                )}&autoCompile=true`}
                target="_blank"
                icon={<FaMagic />}
                text="Open in Remix"
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default EditorPage;
