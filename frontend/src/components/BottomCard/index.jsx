import { Box } from '@mui/material';
import styles from './style.module.css';

function BottomCard({ children, ...rest }) {
  return (
    <Box className={styles.CardBorder} {...rest}>
      <Box className={styles.Card} {...rest}>
        {children}
      </Box>
    </Box>
  );
}

export default BottomCard;
