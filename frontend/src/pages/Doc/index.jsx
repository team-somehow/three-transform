import { Box, ListItem, Typography, Divider } from "@mui/material";
import { Code, shadesOfPurple } from "react-code-blocks";
import { HashLink } from "react-router-hash-link";

const data = [
  {
    id: 1,
    text: "Initial Setup",
    subheadings: [
      {
        id: 1,
        heading: "Obtain ABI and Integrate into Frontend",
        description:
          "Retrieve the ABI (Application Binary Interface) of the smart contract and seamlessly integrate it into the frontend code to facilitate communication between the user interface and the blockchain",
      },
      {
        id: 2,
        heading: " Implement Arcana Login for Wallet Address Retrieval",
        description:
          "Integrate Arcana login functionality to enable users to log in, ensuring a secure and user-friendly experience while obtaining their wallet address for subsequent interactions with the smart contract.",
      },
      {
        id: 3,
        heading: "Integrate Contract Connection Code",
        description:
          "Embed the contract connection code directly into the relevant file where it is required, ensuring a smooth and efficient connection between the frontend and the smart contract on the blockchain.",
      },
      {
        id: 4,
        heading: "Customize Contract Function Calls",
        description:
          'Tailor the code to invoke the specific contract function based on the requirements, ensuring accurate and efficient execution. For example, initiate the function "sendName" with the parameter "name" for the desired blockchain interaction.',
      },
    ],
  },
  {
    id: 2,
    text: "Function Endpoints",
    code: [
      {
        inputs: [
          {
            user: "address",
          },
          {
            name: "string",
          },
        ],
        name: "NameSet",
        outputs: [],
      },
      {
        inputs: [
          {
            _user: "address",
          },
        ],
        name: "getUserName",
        outputs: [
          {
            type: "string",
          },
        ],
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            type: "address",
          },
        ],
      },
      {
        inputs: [
          {
            _name: "string",
          },
        ],
        name: "setUserName",
        outputs: [],
      },
      {
        inputs: [
          {
            address: "string",
          },
        ],
        name: "userNames",
        outputs: [
          {
            type: "string",
          },
        ],
      },
    ],
  },
];

function Doc() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      mx="auto"
      height="calc(100vh - 4rem)"
      padding={2}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          height: "100%",
          borderRadius: "1rem",
          border: "1px solid rgba(255, 255, 255, 0.20)",
          background: "linear-gradient(180deg, #2B243C 0%, #0B031E 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            height: "100%",
            p: 2,
          }}
        >
          {data.map(({ id, text }) => (
            <ListItem key={id} sx={{ display: "list-item" }}>
              <Typography
                variant="body"
                fontWeight={500}
                component={HashLink}
                color="white"
                sx={{ textDecoration: "none" }}
                to={"#" + text.replace(/\s+/g, "-").toLowerCase()}
              >
                {text}
              </Typography>
            </ListItem>
          ))}
        </Box>
        <Divider
          orientation="vertical"
          sx={{
            bgcolor: "#EEEEF0",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            height: "100%",
            p: 2,
            pr: 10,
            scrollBehavior: "smooth",
            overflow: "auto",
          }}
        >
          {data.map(({ id, text, subheadings, code }) => (
            <Box key={id} id={text.replace(/\s+/g, "-").toLowerCase()}>
              <Typography variant="h4" fontWeight={700} mt={1}>
                {text}
              </Typography>
              {subheadings?.map(({ id, heading, description }) => (
                <Box key={id} mb={3} ml={3}>
                  <Typography variant="h5" fontWeight={700} mt={4} mb={1.5}>
                    {`${id}. `}
                    {heading}
                  </Typography>
                  <Typography variant="body" fontWeight={500}>
                    {description}
                    {description}
                    {description}
                    {description}
                    {description}
                  </Typography>
                </Box>
              ))}
              {code?.map((endpoint, index) => (
                <Box key={index} mb={3} ml={3}>
                  <Typography variant="h5" fontWeight={700} mt={3} mb={1.5}>
                    {index + 1}. {endpoint.name}
                    {`()`}
                  </Typography>
                  <Divider
                    sx={{
                      bgcolor: "grey",
                    }}
                  />
                  {endpoint.inputs?.[0] && (
                    <Typography variant="h6" fontWeight={600} mt={2} mb={1.5}>
                      Parameters
                    </Typography>
                  )}
                  {endpoint.inputs?.map((input, index) => {
                    const [key, value] = Object.entries(input)[0];
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 2,
                          mb: 1,
                          ml: 1,
                        }}
                      >
                        <Code
                          text={key}
                          language={"javascript"}
                          theme={shadesOfPurple}
                        />
                        <Code
                          text={value}
                          language={"javascript"}
                          theme={shadesOfPurple}
                        />
                      </Box>
                    );
                  })}
                  {endpoint.outputs?.[0] && (
                    <Typography variant="h6" fontWeight={600} mt={2} mb={1.5}>
                      Response
                    </Typography>
                  )}
                  {endpoint.outputs?.map((input, index) => {
                    const [key, value] = Object.entries(input)[0];
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: 2,
                          mb: 1,
                          ml: 1,
                        }}
                      >
                        <Code
                          text={key}
                          language={"javascript"}
                          theme={shadesOfPurple}
                        />
                        <Code
                          text={value}
                          language={"javascript"}
                          theme={shadesOfPurple}
                        />
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default Doc;
