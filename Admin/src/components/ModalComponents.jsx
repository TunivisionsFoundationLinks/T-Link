import * as React from "react";
import PropTypes from "prop-types";
import { Box, styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import SelectComponents from "./selectComponents";
import { Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, ...other } = props;
  return (
    <Fade in={open}>
      <div ref={ref} {...other} />
    </Fade>
  );
});

BackdropUnstyled.propTypes = {
  open: PropTypes.bool,
};

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  border: "2px solid currentColor",
  boxShadow: 24,
  padding: "16px 32px 24px 32px",
});

export default function ModalComponents() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleBan = () => {
    console.log("baned");
    setOpen(false);
  };
  const handleSubmet = () => {
    console.log("submet");
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        <Typography color="white">Updating Role</Typography>
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box>
              <ClearIcon onClick={handleClose} />
            </Box>
            <Typography
              variant="h1"
              id="transition-modal-title"
              textAlign="center"
            >
              Update Role
            </Typography>
            <Box display="grid" justifyContent="center">
              <SelectComponents />
            </Box>
            <Box display="flex" flexWrap={true} justifyContent="space-evenly">
              <Button
                variant="contained"
                color="secondary"
                aria-label="delete"
                onClick={handleClose}
              >
                Close
              </Button>

              <Button
                variant="contained"
                color="error"
                aria-label="delete"
                onClick={handleBan}
              >
                study List (ابعثه يقرى)
              </Button>

              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmet}
              >
                <Typography color="white">submet</Typography>
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
