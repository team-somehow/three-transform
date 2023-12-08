import {
  Box,
  CardActions,
  CardContent,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { FaMagic } from "react-icons/fa";

import BottomCard from "../../components/BottomCard";
import GradientButton from "../../components/GradientButton";

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

function Home() {
  return (
    <Box>
      <BottomCard
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CardContent>
          <Typography variant="h3" mb={3}>
            Three Simple Steps!
          </Typography>
          <List sx={{ listStyleType: "number" }}>
            {steps.map(({ id, text }) => (
              <ListItem key={id} sx={{ display: "list-item" }}>
                <Typography variant="h6">{text}</Typography>
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardActions sx={{ mt: 3 }}>
          <GradientButton icon={<FaMagic />} />
        </CardActions>
      </BottomCard>
    </Box>
  );
}

export default Home;
