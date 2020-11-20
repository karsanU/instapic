import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import logoutAction from "../../actions/logout";
import IconButton from "@material-ui/core/IconButton";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Home from "../icons/home";
import Heart from "../icons/heart";
import Avatar from "@material-ui/core/Avatar";
import { createPost } from "./../../actions/post";
import "./navbar.css";

// testing commit
function Navbar({ auth, logoutAction, createPost }) {
  const [profileOptions, setProfileOptions] = useState(null);

  const history = useHistory();
  (() => {
    if (auth.loggedIn === false) {
      history.push("/");
    }
  })();
  // handle logout button click
  function handleOnClickLogout() {
    logoutAction();
  }
  // handle image upload
  function handleImageUpload(image) {
    createPost(image, auth.token);
  }

  // when the user profile button is clicked on the navbar present options
  function handleOnClickProfileOptions() {
    setProfileOptions(
      <div className="navbar-profile-options-container">
        <div className="navbar-profile-option-triangle"></div>
        <div className="navbar-profile-option">
          <div className="navbar-profile-option-profile-background">
            <div
              className="navbar-profile-option-profile"
              onClick={() => {
                history.push(`/user/${auth.userName}`);
              }}
            >
              Profile
            </div>
          </div>
          <div
            className="navbar-profile-option-logout"
            onClick={() => {
              handleOnClickLogout();
            }}
          >
            <b>Logout</b>
          </div>
        </div>
      </div>
    );
  }
  // upload button style

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  }));

  const classes = useStyles();
  return (
    <div id="navbar">
      {profileOptions !== null ? (
        <div
          class="profile-options-background"
          onClick={() => {
            setProfileOptions(null);
          }}
        ></div>
      ) : null}
      <div id="navItems-container">
        <h1 id="appName">
          <Link to="/feed"> InstaPic </Link>
        </h1>
        <input type="text" placeholder="Search" id="search" />
        <div id="nav-iconContainer">
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            onChange={(e) => {
              handleImageUpload(e.target.files[0]);
            }}
          />
          <label htmlFor="icon-button-file" className="nav-icon-upload-pic">
            <IconButton aria-label="upload picture" component="span">
              <AddAPhotoOutlinedIcon style={{ fontSize: 27 }} />
            </IconButton>
          </label>
          <Link to="/feed">
            <Home cssclassName="nav-icon" />
          </Link>
          <Heart cssclassName="nav-icon" height={22} width={22} />
          <Avatar
            id="navbar-profile-icon"
            onClick={(e) => {
              handleOnClickProfileOptions();
            }}
          ></Avatar>
        </div>
      </div>
      {profileOptions}
    </div>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { logoutAction, createPost })(Navbar);
