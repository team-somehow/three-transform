import { Box, FormControl, InputAdornment, TextField } from '@mui/material';

import { FaMagic } from 'react-icons/fa';

function LinkInput({ isDisabled, defaultValue, ...rest }) {
  return (
    <FormControl fullWidth sx={{ m: 1, bgcolor: 'transparent' }} {...rest}>
      <TextField
        defaultValue={defaultValue}
        placeholder="Enter your website link here..."
        autoFocus
        disabled={isDisabled || false}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Box
                sx={{
                  display: 'flex',
                  padding: '8px',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '10px',
                  background:
                    'var(--brand-mix, conic-gradient(from 180deg at 50% 50%, #B52BBA 4.666563235223293deg, #A12CBC 23.647727966308594deg, #8C2EBE 44.85525995492935deg, #792FBF 72.45651304721832deg, #6C30C0 82.50000178813934deg, #4B32C3 127.99007892608643deg, #5831C2 160.968976020813deg, #6330C1 178.45529437065125deg, #742FC0 189.47770357131958deg, #8D2DBE 202.95226335525513deg, #A62CBC 230.65982580184937deg, #B92ABA 251.35178089141846deg, #D029B8 276.4414644241333deg, #EC27B6 306.45145654678345deg, #C729B9 331.67617321014404deg))',
                }}
              >
                <FaMagic />
              </Box>
            </InputAdornment>
          ),
          sx: {
            borderRadius: 0.6,
            background: 'rgba(43, 36, 60, 0.90)',
            boxShadow: '0px 0px 60px 0px rgba(236, 39, 182, 0.25)',
            '& .MuiInputBase-input.Mui-disabled': {
              WebkitTextFillColor: 'rgba(255, 208, 242, 0.60)',
            },
          },
        }}
      />
    </FormControl>
  );
}

export default LinkInput;
