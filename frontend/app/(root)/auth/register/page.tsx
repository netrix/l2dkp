'use client'
import * as React from 'react';
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signUpUser } from '@/redux/actions/auth';
import { useRouter } from "next/navigation";


// BASED ON: https://github.com/mui/material-ui/blob/v5.13.2/docs/data/material/getting-started/templates/sign-up/SignUp.tsx

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function Register() {

  const { loading, error, success } = useAppSelector((state) => state.authSliceReducer);
  const router = useRouter();

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    // Redirect to Raids
    if (success) {
      router.push("/raids")
    }
  }, [router, success]);

  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: values => {
      if (values.password === values.confirmPassword) {
        dispatch(signUpUser({login: values.login, password: values.password}));
      } else {
        alert("passwords does not match")
      }

    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  name="login"
                  autoComplete="login"
                  onChange={formik.handleChange}
                  value={formik.values.login}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="confirm-password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
              {/* {loading ? <Spinner /> : 'Register'}  TODO add spinner */}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link // TODO change font..., justify to right
                  // href="#"
                  // variant="body2"
                  href={"/auth/login"} // TODO move links to separate module
                  passHref
                  legacyBehavior
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}