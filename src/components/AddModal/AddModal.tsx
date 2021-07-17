import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { MdModeEdit } from "react-icons/md";
import { useSpring, animated } from "react-spring/dist/react-spring.cjs";

import ModalForm from "./ModalForm/ModalForm";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const SpringModal = ({
  open,
  setOpen,
  value,
  setValue,
  setViewMode,
  setEditMode,
  viewMode,
  editMode,
}: any) => {
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setViewMode(false);
    setValue("");
  };

  return (
    <div>
      <div onClick={handleOpen}>
        <MdModeEdit size={28} cursor={"pointer"} />
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
          
        <Fade in={open}>
          <div className={classes.paper}>
            <ModalForm
              onClick={handleClose}
              value={value}
              setValue={setValue}
              viewMode={viewMode}
              setViewMode={setViewMode}
              editMode={editMode}
              setEditMode={setEditMode}
              open={open}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default SpringModal;
