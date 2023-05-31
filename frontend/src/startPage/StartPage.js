import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StartPageInput from "./components/StartPageInput";
import SubmitButton from "./components/SubmitButton";

import { useHistory } from "react-router-dom";
import { registerNewUser, registerNewRoomNum } from "../connection/socketConnection/socketConnection";
import { setUsername } from "../storage/actions/mainPageActions";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "../mainPage/components/Todo/firebase";

import "./StartPage.css";

const LoginPage = ({ saveUsername }) => {
  const [username, setUsername] = useState("");
  const [roomNum, setRoomNum] = useState("");
  const history = useHistory();

  const handleSubmitButtonPressed = async (e) => {
    e.preventDefault();
    checkValue()
    if (checkValue() === true){
    registerNewUser(username, roomNum);
    saveUsername(username);
    try {
      const docRef = await addDoc(collection(db, "Rooms"), {
        room: document.getElementById("input_num").value,
        username: document.getElementById("input_username").value,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    history.push(`/room/${roomNum}`);
    }
    
  };
  // const firebase = (users) => {
  //   const usersRef = collection(db, "Rooms");
  //   const q = query(
  //     usersRef,
  //     where("username", "==", username),
  //     where("room", "==", room)
  //   );
  //   return getDocs(q).then((qSnap) => {
  //     const data = qSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
  //     if (data.length > 0) {
  //       console.log(data);
  //     } else {
  //       console.log("фу");
  //     }

  //     return data;
  //   });
  // };
  function checkValue() {
    var a = document.getElementById("input_username").value;
    var b = document.getElementById("input_num").value;
    if ((a == null || a === "") || (b == null || b === "")) {
      alert("Заполните все поля");
      return false;
    }else return true;
  }
  
  return (
    <div className="start_page_container">
      
      <div className="start_page_box">
            <div className="start_page_logo_container">
              <img className="start_page_logo_image" src="https://media.giphy.com/media/5pUFq4uDGD2cKtIt01/giphy.gif" alt="utopia" />
            </div>
            <div className="start_page_title_container">
              <h2>Утопия</h2>
            </div>
            <StartPageInput username={username} room={roomNum} setUsername={setUsername} setRoomNum={setRoomNum} />
            
            <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
          </div><footer className="footer_container">
              {" "}
              <small className="footer_title">Алискерова Арина 2023</small>{" "}
            </footer>
      
    </div>
  );
  
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: (username) => dispatch(setUsername(username))
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
