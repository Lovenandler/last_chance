import React, { useState } from "react";
import { connect } from "react-redux";
import UsernameInput from "./components/Usernameinput";
import SubmitButton from "./components/SubmitButton";
import { useHistory } from "react-router-dom";
import { registerNewUser } from "../connection/socketConnection/socketConnection";
import { setUsername } from "../storage/actions/mainPageActions";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../mainPage/components/Todo/firebase";

import "./StartPage.css";

const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const history = useHistory();

  const handleSubmitButtonPressed = async (e) => {
    e.preventDefault();

    registerNewUser(username);
    saveUsername(username);
    let roomCode = document.getElementById("number_room").value;
    if (!roomCode) {
      roomCode = String(Math.floor(Math.random() * 10000));
    }
    try {
      const docRef = await addDoc(collection(db, "Rooms"), {
        room: room,
        username: username,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    history.push(`/room?room=${roomCode}`);
  };
  const firebase = (users) => {
    const usersRef = collection(db, "Rooms");
    const q = query(
      usersRef,
      where("username", "==", username),
      where("room", "==", room)
    );
    return getDocs(q).then((qSnap) => {
      const data = qSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
      if (data.length > 0) {
        console.log(data);
      } else {
        console.log("фу");
      }

      return data;
    });
  };
  return (
    <div className="start_page_container">
      <div className="start_page_box">
        <div className="start_page_logo_container">
          <img className="start_page_logo_image" alt="utopia" />
        </div>
        <div className="start_page_title_container">
          <h2>Utopia</h2>
        </div>
        <UsernameInput username={username} setUsername={setUsername} />
        <input
          type="text"
          id="number_room"
          placeholder="Номер комнаты"
          onChange={(e) => setRoom(e.target.value)}
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
