import { Card } from "@mui/material";
import styles from "./style.module.css";

function BottomCard({ children, ...rest }) {
  return (
    <Card component="div" className={styles.Card} {...rest}>
      {children}
    </Card>
  );
}

export default BottomCard;
