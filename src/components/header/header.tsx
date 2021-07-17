import React from "react";
import { MdPlaylistAddCheck } from "react-icons/md";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SwipeAbleTemporaryDrawer from "../SideBar/SideBar";
import AddModal from "../AddModal/AddModal";
import "./header.css";

const Header = (props: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setFilter(e.currentTarget.value);
  };

  return (
    <header
      className="w-100 d-flex align-items-center text-light p-2"
      style={{ backgroundColor: "#6200EA" }}
    >
      <div className="w-75 d-flex align-items-center">
        <span className={""}>
          <MdPlaylistAddCheck className="icon"></MdPlaylistAddCheck>
        </span>
        <h4 className="mx-2">MY To-Do Tasks</h4>
      </div>
      <div className="w-25 d-flex justify-content-around align-items-center">
        <TextField
          onChange={handleChange}
          id="standard-basic"
          label="Search"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <SwipeAbleTemporaryDrawer
          setFilters={props.setFilters}
          filters={props.filters}
        />
        <AddModal
          open={props.open}
          setOpen={props.setOpen}
          value={props.value}
          setValue={props.setValue}
          viewMode={props.viewMode}
          setViewMode={props.setViewMode}
          editMode={props.editMode}
          setEditMode={props.setEditMode}
        />
      </div>
    </header>
  );
};

export default Header;
