import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  CardActions,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import BottomCard from "../../components/BottomCard";
import LinkInput from "../../components/LinkInput";
import { Link, useLocation, useNavigate } from "react-router-dom";

function MagicOptions() {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const [ideasList, setIdeasList] = useState([
    {
      id: "01",
      text: "Use React and TypeScript to build custom tooling that unlocks teams within your organization to do their best work, at speed. Share them in your private extension store.",
    },
    {
      id: "02",
      text: "Use React and TypeScript to build custom tooling that unlocks teams within your organization to do their best work, at speed. Share them in your private extension store.Use React and TypeScript to build custom tooling that unlocks teams within your organization to do their best work, at speed. Share them in your private extension store.",
    },
  ]);

  const handleOptionOnClick = (id) => {
    console.log(id);
    // Select option with id
    navigate("/editor");
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexDirection="column"
      width="80%"
      mx="auto"
      height="calc(100vh - 8rem)"
    >
      <Box width="60%" mx="auto" pt={4} mb={3}>
        <LinkInput isDisabled />
        <Typography
          align="center"
          sx={{
            textAlign: "center",
            display: "block",
            color: "inherit",
            textDecoration: "none",
          }}
          variant="body1"
          component={Link}
          to="/"
        >
          Lets start again?
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
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
            width: "calc(100% - 4rem)",
            height: "33rem",
            borderRadius: "2rem",
          }}
        >
          <Box>
            <Typography variant="h4" mt={3} mb={2} fontWeight={700}>
              Current approach
            </Typography>
            <Box
              sx={{
                borderRadius: 2,
                background: "rgba(255, 255, 255, 0.10)",
                px: 4,
                py: 1.6,
                textAlign: "center",
              }}
            >
              <Typography variant="body1" fontWeight={400}>
                Use React and TypeScript to build custom tooling that unlocks
                teams within your organization to do their best work, at speed.
                Share them in your private extension store.
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography variant="h4" mt={3} mb={2} fontWeight={700}>
              Generated ideas
            </Typography>
            {ideasList.map(({ id, text }, i) => {
              return (
                <ListItem
                  key={i}
                  disablePadding
                  sx={{
                    borderRadius: 2,
                    background: "rgba(255, 255, 255, 0.10)",
                    textAlign: "center",
                    my: 2,
                  }}
                  onClick={() => handleOptionOnClick(id)}
                >
                  <ListItemButton
                    sx={{
                      px: 4,
                      py: 1.6,
                    }}
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          borderRadius: 1,
                          background:
                            "radial-gradient(100% 100% at 50% 50%, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.00) 100%), rgba(255, 255, 255, 0.20)",
                          height: "3rem",
                          width: "3rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "1.5rem",
                          color: "white",
                          mr: 4,
                        }}
                      >
                        {id}
                      </Box>
                    </ListItemIcon>
                    <ListItemText align="left" primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Box>
        </CardContent>
      </BottomCard>
    </Box>
  );
}

export default MagicOptions;
