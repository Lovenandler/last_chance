import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import StartPageInput from "./components/StartPageInput";
import SubmitButton from "./components/SubmitButton";
import { useHistory } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  registerNewUser,
  registerNewRoomNum,
} from "../connection/socketConnection/socketConnection";
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
    checkValue();
    if (checkValue() === true) {
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
 
  function enter_btn(){
    document.addEventListener('DOMContentLoaded', () => {
      let btn = document.getElementById('register_btn');
      btn.addEventListener('click', () => {
          document.getElementById('carousel').style.visibility = 'hidden';
          document.getElementById('welcome_text').style.visibility = 'hidden';
          document.getElementById('start_page_register').style.visibility = 'visible';
      });
  });
  }  
  function faq_btn(){
    document.addEventListener('DOMContentLoaded', () => {
      let btn = document.getElementById('faq_btn');
      btn.addEventListener('click', () => {
          document.getElementById('carousel').style.visibility = 'hidden';
          document.getElementById('welcome_text').style.visibility = 'hidden';
          document.getElementById('faq_docs_container').style.visibility = 'visible';
      });
  });
  }  
  function title_btn(){
    document.addEventListener('DOMContentLoaded', () => {
      let btn = document.getElementById('utopia_logo_title');
      btn.addEventListener('click', () => {
          document.getElementById('carousel').style.visibility = 'visible';
          document.getElementById('welcome_text').style.visibility = 'visible';
          document.getElementById('start_page_register').style.visibility = 'hidden';
      });
  });
  }  
  
  function checkValue() {
    var a = document.getElementById("input_username").value;
    var b = document.getElementById("input_num").value;
    if (a == null || a === "" || b == null || b === "") {
      alert("Заполните все поля");
      return false;
    } else return true;
  }

  return (
    <div className="start_page_container">
       <header className="header_start_page">
        <h4 className="utopia_logo_title" id="utopia_logo_title" onClick={title_btn()}>Утопия</h4>
        <button className="faq_button" id="faq_btn" onClick={faq_btn()}>А как пользоваться?</button>
        <button className="register_btn_to_div" id="register_btn" onClick={enter_btn()}>Войти</button>
      </header> 
     <main>
      <div className="welcome_text" id="welcome_text">
        <h1 className="welcome_title">
          Приветствую в <span className="utopia_welcome_text">Утопии</span>
        </h1>
        <p className="greeting_welcome">
          Место, где ты создаёшь пространство, которое подходит именно тебе
        </p>
        </div>
          <Carousel id="carousel" className="carousel_info" interval={6000} slide={false}>
      <Carousel.Item>
      <img className="greeting_image" src='https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/Погулять%20с%20собакой.png?alt=media&token=386935e7-7a99-41de-97cf-93925d273d4e&_gl=1*h6yhah*_ga*NTkxNDUyNTI2LjE2ODUwMDI3MjA.*_ga_CW55HF8NVT*MTY4NTcyNzgyMi44LjEuMTY4NTcyNzg3MC4wLjAuMA..' alt="Функционал без приложения"></img>
          <h1 className="works_title">Как работает и для чего это вообще?</h1>
        
      </Carousel.Item>
      <Carousel.Item>
      <div className="spaces_works_container">
          <h1 className="spaces_works_title">Персональные пространства</h1>
          <img className="spaces_image_works" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/коллаж%20с%20пространствами.png?alt=media&token=0e0e08e0-5c69-4ec7-b584-0d48cad91154&_gl=1*9efeqe*_ga*NTkxNDUyNTI2LjE2ODUwMDI3MjA.*_ga_CW55HF8NVT*MTY4NTcyNzgyMi44LjEuMTY4NTcyOTUzMy4wLjAuMA.." alt="Пространства"></img>
          <p className="spaces_works_text">Благодаря коллекции пространств, ты можешь погрузиться <br/> в нужную атмосферу и лучше сосредоточиться на делах</p>
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="calendar_works_container">
          <img className="calendar_image_works" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/календарик.png?alt=media&token=371a283e-94c8-4e14-9e92-2313ed8d732f&_gl=1*rqnejz*_ga*NTkxNDUyNTI2LjE2ODUwMDI3MjA.*_ga_CW55HF8NVT*MTY4NTcyNzgyMi44LjEuMTY4NTczMDYwMi4wLjAuMA.." alt="Календарь"></img>
            <h1 className="calendar_works_title">Быстрый доступ к календарю</h1>
            <p className="calendar_works_text">Подключи свой Google-аккаунт и управляй своими делами,<br/> не бегая по вкладкам</p>
          </div>
      </Carousel.Item>
      <Carousel.Item>
      <div className="call_works_container">
          <img className="call_image_works" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/разговор.png?alt=media&token=c700f978-9634-45c6-a7b9-e5bbb3e19462&_gl=1*1jzdv07*_ga*NTkxNDUyNTI2LjE2ODUwMDI3MjA.*_ga_CW55HF8NVT*MTY4NTcyNzgyMi44LjEuMTY4NTczMDkzOC4wLjAuMA.." alt="Звонки"></img>
            <h1 className="call_works_title">Звони, пиши, общайся!</h1>
            <p className="call_works_text">Ты можешь подключить своих друзей и делать домашку вместе<br/> или созвониться с коллегами и обсудить важные вопросы</p>
          </div>
      </Carousel.Item>
    </Carousel>
        </main>
        <div className="start_page_elements" id="start_page_register">
        <div className="start_page_logo_container">
          <img className="start_page_logo_image" src="https://media.giphy.com/media/w1pwl0F67JHGFLseNk/giphy.gif" alt="utopia" />
        </div>
        <div className="start_page_title_container">
          <h2>Войти</h2>
        </div>
        <StartPageInput username={username} room={roomNum} setUsername={setUsername} setRoomNum={setRoomNum} />
        
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
        </div>
        <div className="faq_docs_container" id="faq_docs_container">
          <h1>Привет</h1>
          <h1>Привет</h1>
          <h1>Привет</h1>
          <h1>Привет</h1>
          <h1>Привет</h1>
          <h1>Привет</h1>
          <h1>Привет</h1>
          <h1>Привет</h1>
          <h1>Привет</h1>
        </div>
      </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: (username) => dispatch(setUsername(username)),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
