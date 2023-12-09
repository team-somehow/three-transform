import {
  Box,
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

const tempSteps = [
  {
    id: "01",
    text: "Stuart added a feature request",
  },
  {
    id: "01",
    text: "Stuart added a feature request",
  },
  {
    id: "01",
    text: "Stuart added a feature request",
  },
  {
    id: "01",
    text: "Stuart added a feature request",
  },
];

function EditorPage() {
  const [tabsLayout, setTabsLayout] = useState([33, 33, 33]);

  const onTabClick = (index) => {
    setTabsLayout([4, 76, 20]);
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
                  Use React and TypeScript to build custom tooling that unlocks
                  teams within your organization to do their best work, at
                  speed. Share them in your private extension store.
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
                  A few more,{" "}
                  <Typography
                    component="span"
                    sx={{
                      color: "rgba(255, 255, 255, 0.4)",
                    }}
                    fontSize={18}
                    fontWeight="bold"
                  >
                    questions.
                  </Typography>
                </Typography>
                <Box px={1} pt={1} height="100%">
                  <TextField
                    fullWidth
                    multiline
                    minRows={9}
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
            <Box
              sx={{
                mt: 2,
                display: "flex",
                padding: "8px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                borderRadius: "10px",
                background:
                  "var(--brand-mix, conic-gradient(from 180deg at 50% 50%, #B52BBA 4.666563235223293deg, #A12CBC 23.647727966308594deg, #8C2EBE 44.85525995492935deg, #792FBF 72.45651304721832deg, #6C30C0 82.50000178813934deg, #4B32C3 127.99007892608643deg, #5831C2 160.968976020813deg, #6330C1 178.45529437065125deg, #742FC0 189.47770357131958deg, #8D2DBE 202.95226335525513deg, #A62CBC 230.65982580184937deg, #B92ABA 251.35178089141846deg, #D029B8 276.4414644241333deg, #EC27B6 306.45145654678345deg, #C729B9 331.67617321014404deg))",
              }}
            >
              <FaMagic />
            </Box>
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
              defaultLanguage="javascript"
              defaultValue="console.log('Hello')"
              theme="vs-dark"
            />
          </Box>
          <LightButton text="Magic Deploy" icon={<FaMagic />} />
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
            <Box px={2} py={4}>
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
            </Box>
          </Box>
          <YellowButton
            text="Download Hardhat"
            fullWidth
            icon={<LuHardHat color="black" />}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default EditorPage;
