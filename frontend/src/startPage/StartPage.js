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
import { getDatabase, ref, set, child, push  } from "firebase/database";
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
      try{
          const db = getDatabase();
          const newKey = push(child(ref(db), 'Rooms')).key;
          set(ref(db, 'Rooms/' + roomNum), {
            ID_User: username,
            Room_name: roomNum
          });
      }catch(e){
        console.log(e.message);
      }
      // try {
      //   const docRef = await addDoc(collection(db, "Rooms"), {
      //     room: document.getElementById("input_num").value,
      //     username: document.getElementById("input_username").value,
      //   });
      //   console.log("Document written with ID: ", docRef.id);
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }
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
          document.getElementById('faq_docs_container').style.visibility = 'hidden';
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
          document.getElementById('start_page_register').style.visibility = 'hidden';
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
          document.getElementById('faq_docs_container').style.visibility = 'hidden';
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
      <img className="greeting_image" src='https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/Frame%201.png?alt=media&token=677968b6-9e65-447f-b498-b869ea490d9e&_gl=1*k8lxpo*_ga*NTkxNDUyNTI2LjE2ODUwMDI3MjA.*_ga_CW55HF8NVT*MTY4NTk3MzkxNi4xNi4xLjE2ODU5NzM5MjYuMC4wLjA.' alt="Функционал без приложения"></img>
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
          <div className="faq_instruments">
          <h1 className="title_faq">Меню инструментов</h1>
          <p className="text_faq" style={{textAlign: 'left'}}>Для того, чтобы получить доступ к инструментам, есть специальная панель</p>
          <img className="faq_instruments_img" alt="меню инструментов" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/toolbar.jpg?alt=media&token=e3c5a9ea-8264-4196-9206-d748a5304b4d"></img>
          <p className="text_faq" style={{textAlign: 'left'}}>Её можно скрыть нажав на иконку сверху</p>
          </div>
          <h1 className="title_faq">Как закрыть инструмент?</h1>
          <p className="text_faq" style={{textAlign: 'left'}}>Чтобы закрыть инструмент, необходимо нажать на иконку инструмента ещё раз и он исчезнет</p>
          <img className="faq_close_img" alt="закрыть инструмент" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/close_widget.jpg?alt=media&token=8c56f7a2-b2b2-475f-aee9-08f4051503b8&_gl=1*4ozmg*_ga*NTkxNDUyNTI2LjE2ODUwMDI3MjA.*_ga_CW55HF8NVT*MTY4NTkxMjQ2My4xMy4xLjE2ODU5MTI0NjkuMC4wLjA."></img>
          <h1 className="title_faq">Управляй своим пространством</h1>
          <p className="text_faq" style={{textAlign: 'left'}}>Нажми на иконку смайликов и фон будет меняться автоматически.</p>
          <p className="text_faq" style={{textAlign: 'left'}}>Жмякай, пока не найдешь тот, который тебе идеально подходит</p>
          <img className="faq_space_img" alt="выбрать фон" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/choose_space.jpg?alt=media&token=dd98276d-133f-4d49-995c-78ff87a742e3&_gl=1*m9l1dv*_ga*NTkxNDUyNTI2LjE2ODUwMDI3MjA.*_ga_CW55HF8NVT*MTY4NTkxMjQ2My4xMy4xLjE2ODU5MTMxMjcuMC4wLjA."></img>
          <h1 className="title_faq">Созванивайся с друзьями</h1>
          <p className="text_faq" style={{textAlign: 'left'}}>Чтобы создать звонок нажми на кнопку в верхнем углу и откроется панель всех возможностей звонка</p>
          <img className="faq_create_call_img" alt="создать звонок" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/create_call.jpg?alt=media&token=b1bf47d3-7670-47e3-bdbc-6442f78bf362&_gl=1*8rwmol*_ga*NTkxNDUyNTI2LjE2ODUwMDI3MjA.*_ga_CW55HF8NVT*MTY4NTkxMjQ2My4xMy4xLjE2ODU5MTM2NDguMC4wLjA."></img>
          <h1 className="title_faq">Как позвонить?</h1>
          <p className="text_faq" style={{textAlign: 'left'}}>Для того, чтобы связаться с участником комнаты, нужно нажать на него и ему поступит звонок</p>
          <img className="faq_create_call_img" alt="создать звонок" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/to_call.jpg?alt=media&token=55041718-258f-4a6f-91e7-06df1dc2cf32&_gl=1*1364wd7*_ga*NTkxNDUyNTI2LjE2ODUwMDI3MjA.*_ga_CW55HF8NVT*MTY4NTk1MTI0MC4xNC4xLjE2ODU5NTM1ODEuMC4wLjA."></img>
          <h1 className="title_faq">Создавай групповые комнаты</h1>
          <p className="text_faq" style={{textAlign: 'left'}}>Жми на кнопку "Создать комнату" и она отобразиться в списке доступных всем участникам.</p>
          <p className="text_faq" style={{textAlign: 'left'}}>Чтобы присоединиться к существующей, необходимо нажать на название желаемой комнаты и бум! Ты подключился!</p>
          <img className="faq_group_call_img" alt="создать комнату" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/create_call_room.jpg?alt=media&token=8050161e-8361-4bd6-afbd-878426a06cf9&_gl=1*15zwj9p*_ga*NTkxNDUyNTI2LjE2ODUwMDI3MjA.*_ga_CW55HF8NVT*MTY4NTkxMjQ2My4xMy4xLjE2ODU5MTM2MTIuMC4wLjA."></img>
          <h1 className="title_faq">Хочешь вернуться на главную страницу и покинуть комнату?</h1>
          <p className="text_faq" style={{textAlign: 'left'}}>Нажми на кнопку "Выход" и страница обновится.</p>
          <img className="faq_exit_img" alt="закрыть инструмент" src="https://firebasestorage.googleapis.com/v0/b/utopia-386509.appspot.com/o/leave_room.jpg?alt=media&token=05d777a5-afbd-44b0-b5c5-387639f0daea&_gl=1*9nq8q6*_ga*NTkxNDUyNTI2LjE2ODUwMDI3MjA.*_ga_CW55HF8NVT*MTY4NTkxMjQ2My4xMy4xLjE2ODU5MTM2OTUuMC4wLjA."></img>
          <h2 className="text_faq_end" style={{textAlign: 'center'}}>Вот и всё! Приятного пользования!
          <img className="faq_bye_image" src="https://media.giphy.com/media/lonWFYfXEhH9dGnyX0/giphy.gif" alt="пока-пока"></img></h2>        
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
