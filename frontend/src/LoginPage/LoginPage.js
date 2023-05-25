import React, { useState } from "react";
import { connect } from "react-redux";
import UsernameInput from "./components/Usernameinput";
import SubmitButton from "./components/SubmitButton";
import { useHistory } from "react-router-dom";
import { registerNewUser } from "../utils/wssConnection/wssConnection";
import { setUsername } from "../store/actions/dashboardActions";
import { collection, addDoc } from "firebase/firestore";
import {db} from '../Dashboard/components/Todo/firebase';

import "./LoginPage.css";

const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const history = useHistory();
  const handleSubmitButtonPressed = async (e) => {
    e.preventDefault();
    
    registerNewUser(username);
    saveUsername(username);
    let roomCode = document.getElementById('number_room').value
    if(!roomCode){
      roomCode = String(Math.floor(Math.random() * 10000))
  }
  try {
    const docRef = await addDoc(collection(db, "Rooms"), {
      room: room,
      username: username    
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
    history.push(`/room?room=${roomCode}`);
  };

  return (
    <div className="login-page_container background_main_color">
      <div className="login-page_login_box background_secondary_color">
        <div className="login-page_logo_container">
          <img className="login-page_logo_image"  alt="VideoTalker" />
        </div>
        <div className="login-page_title_container">
          <h2>Utopia</h2>
        </div>
        <UsernameInput username={username} setUsername={setUsername} />
        <input
                            type="text"
                            id="number_room"
                            placeholder="Номер комнаты"
                            onChange={(e)=>setRoom(e.target.value)}
                        />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
      <footer>
        {" "}
        <small>Алискерова Арина 2023</small>{" "}
      </footer>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: (username) => dispatch(setUsername(username)),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
