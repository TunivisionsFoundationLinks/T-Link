import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  ListSubheader,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const FormAdmin = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="CREATE ADMIN" subtitle="Create a New Admin" />

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
          <form onSubmit={handleSubmit}>
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
                type="text"
                label="Admin Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="lastname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name="lastname"
                error={!!touched.lastname && !!errors.lastname}
                helperText={touched.lastname && errors.lastname}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl>
                <InputLabel id="demo-select-small">Chapter</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={values.Chapter}
                  label="Chapter"
                  name="Chapter"
                  onChange={handleChange}
                >
                  <MenuItem value={"Alumni"}>Alumni</MenuItem>
                  <MenuItem value={"University"}>University</MenuItem>
                  <MenuItem value={"High-School"}>High-School</MenuItem>
                  <MenuItem value={"Teens"}>Teens</MenuItem>
                  <MenuItem value={"Kids"}>Kids</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="demo-select-small">Role</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={values.role}
                  label="role"
                  name="role"
                  onChange={handleChange}
                >
                  <MenuItem value={"Coordinateur"}>
                    Coordinateur/Coordinatrice
                  </MenuItem>
                  <ListSubheader label="Manangers">
                    <MenuItem value={"Manager Ressources humaines"}>
                      Manager Ressources humaines
                    </MenuItem>
                    <MenuItem value={"Manager Marketing Communication"}>
                      Manager Marketing Communication
                    </MenuItem>
                    <MenuItem value={"Manager événementielle"}>
                      Manager événementielle
                    </MenuItem>
                    <MenuItem value={"Manager Business Development"}>
                      Manager Business Development
                    </MenuItem>
                    <MenuItem value={"Manager Digital"}>Manager Digital</MenuItem>
                    <MenuItem value={"Manager Process"}>Manager Process</MenuItem>
                  </ListSubheader>
                  <ListSubheader label="Consultants">
                    <MenuItem value={"Consultant"}>Consultant</MenuItem>
                  </ListSubheader>
                  <MenuItem value={"attache"}>attache</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.role}
                name="address"
                error={!!touched.role && !!errors.role}
                helperText={touched.role && errors.role}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="password"
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
              <Button type="submit" color="secondary" variant="contained">
                Create New Admin
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  isAdmin: false,
  Chapter: yup.string().required("required"),
  role: yup.string().required("required"),
  // about: yup.string().required("required"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  isAdmin: false,
  Chapter: "",
  role: "",
  isBureau: true,
  worksAt: "",
};

export default FormAdmin;
