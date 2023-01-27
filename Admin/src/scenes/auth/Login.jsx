import { Box, Button, TextField, useMediaQuery } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { logIn } from "../../actions/AuthAction.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState(initialValues);


  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(logIn(data, navigate));
  };
  return (
    <Box display="grid" m="auto">
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleFormSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                fullWidth
                variant="contained"
              >
                {loading ? "Loading..." :  "Login"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().password("invalid password").required("required"),
});
const initialValues = {
  email: "",
  password: "",
};

export default Login;
