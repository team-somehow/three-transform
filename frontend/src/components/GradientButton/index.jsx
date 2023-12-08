import { Button } from "@mui/material";
import React from "react";
import styles from "./index.module.css";

function GradientButton({ icon, ...rest }) {
  return (
    <Button
      startIcon={icon || null}
      className={styles.GradientButton}
      variant="contained"
      {...rest}
    >
      GradientButton
    </Button>
  );
}

export default GradientButton;
