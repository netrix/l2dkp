'use client'
import * as React from 'react';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';

// BASED ON: https://github.com/mui/material-ui/blob/v5.8.7/docs/data/material/getting-started/templates/sign-in/SignIn.tsx


const theme = createTheme();

export default function SignIn() {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.login}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid
              container
              direction="column"
            >
              <Grid item>
                <Link // TODO change font..., justify to right
                  // href="#"
                  // variant="body2"
                  href={"/auth/signup"}
                  passHref
                  legacyBehavior
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              <Divider
                light
                sx={{
                  marginTop: "16px",
                  marginBottom: "16px",
                }}
              />
              <Grid
                item
                sx={{

                }}
              >
                <Typography variant="caption" display="block">
                  Lost password? Contact admin.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}