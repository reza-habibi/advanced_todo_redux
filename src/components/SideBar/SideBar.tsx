import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import { FiFilter } from "react-icons/fi";
import Divider from "@material-ui/core/Divider";
import SelectBox from "./SelectBoxes/SelectBox";

import './Sidebar.Style.css'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

type Anchor = "right";

const SwipeAbleTemporaryDrawer = (props:any) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, right: open });
    };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)};
    >
      <div className="sideBar-header d-flex justify-content-center align-items-center">
        <FiFilter
          style={{
            backgroundColor: "#6200EA",
            marginRight: "0.5rem",
            borderRadius: "50%",
            padding: "10px",
          }}
          size={48}
          color={"white"}
        />
        <div className="filter-text d-flex flex-column align-items-start">
          <h5 className="pt-2">My To-Do Tasks</h5>
          <p>Filters</p>
        </div>
      </div>

      <Divider />
      <div className="filters-section mt-4">
        <SelectBox  setFilters={props.setFilters}
          filters={props.filters}/>
      </div>
    </div>
  );

  return (
    <div>
      {
        <React.Fragment>
          <Button onClick={toggleDrawer("right", true)}>
            {" "}
            <FiFilter size={28} color={"white"}></FiFilter>
          </Button>
          <SwipeableDrawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            {list("right")}
          </SwipeableDrawer>
        </React.Fragment>
      }
    </div>
  );
};

export default SwipeAbleTemporaryDrawer;
