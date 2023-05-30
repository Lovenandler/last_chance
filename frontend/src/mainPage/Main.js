import React, { useEffect, useState } from "react";
import UsersList from "./components/UsersList/UsersList";
import UsersListClosed from "./components/UsersList/UsersListClosed";
import * as webRTCHandler from "../connection/webRTC/webRTCHandler";
import * as webRTCGroupHandler from "../connection/webRTC/GroupCallHandler";
import Call from "./components/Call/Call";
import { connect } from "react-redux";
import { LoginSignout } from "./components/Calendar/LoginSignout";
import CallInfo from "./components/CallInfo/CallInfo";
import { callStates } from "../storage/actions/callActions";
import GroupCallRoomsList from "./components/GroupCallRoomsList/GroupCallRoomsList";
import GroupCall from "./components/GroupCall/GroupCall";
import "./Main.css";
import DisplayTodo from "./components/Todo/DisplayTodo";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./components/Todo/firebase";
import { useHistory, Link } from "react-router-dom";
import AddTodo from "./components/Todo/AddTodo";
import VideoPlayer from "./components/Video/VideoPlayer";
import AudioPlayer from "./components/Audio/AudioPlayer";
import MainPagePomodoro from "./components/Pomodoro/MainPage";
import ConfigurePage from "./components/Pomodoro/ConfigurePage";
import Draggable from "react-draggable";
const MainPage = ({ username, callState }) => {
  const [isConfigure, setIsConfigure] = useState(false);
  const [pomodoro, setPomodoro] = useState(0);
  const [pomoBreak, setPomoBreak] = useState(0);
  const [todos, setTodos] = React.useState([]);
  const history = useHistory();
  const updateConfigure = (bool) => {
    setIsConfigure(bool);
  };
  const updatePomodoro = (_pomodoro, _pomoBreak) => {
    setPomodoro(_pomodoro);
    setPomoBreak(_pomoBreak);
  };
  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);
  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  const routeChange = () =>{ 
    let path = `newPath`; 
    history.push(path);
  }
  //UseEffect to take eye on bool change
  useEffect(() => {
    setIsConfigure(isConfigure);
  }, [isConfigure]);
  useEffect(() => {
    webRTCHandler.getLocalStream();
    webRTCGroupHandler.connectWithMyPeer();
  }, []);
  const [showPomodoro, setShowPomodoro] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const [showCalendar, setShowCalendar] = useState(true);
  const [showAudio, setShowAudio] = useState(true);
  const [showVideo, setShowVideo] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [showTodo, setShowTodo] = useState(true);
  const [showCall, setShowCall] = useState(true);
  const [showUsers, setShowUsers] = useState(true);
  const [showUsersClosed, setShowUsersClosed] = useState(true);
  function videoNature() {
    var paths = ["SnUBb-FAlCY", "UZ9uyQI3pF0", "nAYUhMzclfk"];

    var item = paths[Math.floor(Math.random() * paths.length)];

    document.getElementById("video").src =
      "https://youtube.com/embed/" +
      item +
      "?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&rel=0&vq=hd720&mute=1";
  }
  function videoWalk() {
    var paths = ["LFOx-vmYrts", "sBtYWK817-0", "jxQX5XI766c"];

    var item = paths[Math.floor(Math.random() * paths.length)];

    document.getElementById("video").src =
      "https://youtube.com/embed/" +
      item +
      "?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&rel=0&vq=hd720&mute=1";
  }
  function videoAnime() {
    var paths = ["OHORwLnHIEw", "Gdalp_QdWF8", "z9Ug-3qhrwY"];

    var item = paths[Math.floor(Math.random() * paths.length)];

    document.getElementById("video").src =
      "https://youtube.com/embed/" +
      item +
      "?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&rel=0&vq=hd720&mute=1";
  }
  function videoPets() {
    var paths = ["4NrpprUAa2U", "KvE92fCMbmc", "uYJQIKAVBw8"];

    var item = paths[Math.floor(Math.random() * paths.length)];

    document.getElementById("video").src =
      "https://youtube.com/embed/" +
      item +
      "?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&rel=0&vq=hd720&mute=1";
  }
  function videoAbstract() {
    var paths = ["dXHfQlcruU8", "j-9AjSqm6D4", "xDFWLudn5WY"];

    var item = paths[Math.floor(Math.random() * paths.length)];

    document.getElementById("video").src =
      "https://youtube.com/embed/" +
      item +
      "?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&rel=0&vq=hd720&mute=1";
  }
  function videoCafe() {
    var paths = ["MYPVQccHhAQ", "3be40pMfSas", "bctWQxhOfG4"];

    var item = paths[Math.floor(Math.random() * paths.length)];

    document.getElementById("video").src =
      "https://youtube.com/embed/" +
      item +
      "?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&rel=0&vq=hd720&mute=1";
  }
  function videoLofi() {
    var paths = ["AzV77KFsLn4", "_tV5LEBDs7w", "XWsptjpzBW0"];

    var item = paths[Math.floor(Math.random() * paths.length)];

    document.getElementById("video").src =
      "https://youtube.com/embed/" +
      item +
      "?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&rel=0&vq=hd720&mute=1";
  }
  function videoLibrary() {
    var paths = ["YlnUCFUSyew", "WSqOXLK4_UU", "4vIQON2fDWM"];

    var item = paths[Math.floor(Math.random() * paths.length)];

    document.getElementById("video").src =
      "https://youtube.com/embed/" +
      item +
      "?autoplay=1&controls=0&showinfo=0&autohide=1&loop=1&rel=0&vq=hd720&mute=1";
  }
  function openListUsers() {
    document.getElementById("users_list_closed").style.visibility = "hidden";
    document.getElementById("users_list").style.visibility = "visible";
    document.getElementById("users_list").style.right = "-100px";
  }
  function closeListUsers() {
    document.getElementById("users_list_closed").style.visibility = "visible";
    document.getElementById("users_list").style.visibility = "hidden";
  }
  function exitRoom() {
  }

  return (
    <div className="main">
      <iframe
        title="video_bg"
        id="video"
        style={{
          width: "150%",
          height: "150%",
          position: "absolute",
          left: "50%",
          top: "30%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}
        src="https://youtube.com/embed/aiWhkBAt6sg?autoplay=1&mute=1&vq=hd720&controls=0&showinfo=0&rel=0"
      ></iframe>
      <div className="header">
        <button
          className="tools_menu_btn_header"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        ></button>
        <button
          className="start_call"
          onClick={() => {
            setShowCall(!showCall);
            // try {
            //   if (
            //     document.getElementById("call").style.visibility === "visible"
            //   ) {
            //     document.getElementById("call").style.visibility = "hidden";
            //   } else if (
            //     document.getElementById("call").style.visibility === "hidden"
            //   ) {
            //     document.getElementById("call").style.visibility = "visible";
            //   }
            // } catch {
            //   console.log("null");
            // }
          }}
        >
          <span className="create_call_title">Начать звонок</span>
        </button>
        <Link to="/" className="link_to_page">Sign up</Link>
        <button className="sign_google_btn" onClick={exitRoom()}>
          <span className="enter_google_title">Выход</span>
          <img
            className="google_icon"
            src="https://img.icons8.com/?size=512&id=q4ZIbaRJl8l0&format=png"
            alt="Выход"
          ></img>
        </button>
      </div>
      <div className="main_container">
        {showMenu && (
          <div className="main_instrumental_container">
            <div className="space_buttons_container">
              <button
                title="Природа"
                className="nature_btn_space"
                onClick={videoNature}
              ></button>
              <button
                title="Аниме"
                className="anime_btn_space"
                onClick={videoAnime}
              ></button>
              <button
                title="Животные"
                className="pets_btn_space"
                onClick={videoPets}
              ></button>
              <button
                title="Абстракция"
                className="abstract_btn_space"
                onClick={videoAbstract}
              ></button>
              <button
                title="Кафе"
                className="coffee_btn_space"
                onClick={videoCafe}
              ></button>
              <button
                title="Lo-fi"
                className="lofi_btn_space"
                onClick={videoLofi}
              ></button>
              <button
                title="Библиотека"
                className="library_btn_space"
                onClick={videoLibrary}
              ></button>
              <button
                title="Прогулка"
                className="walk_btn_space"
                onClick={videoWalk}
              ></button>
            </div>
            <div className="instrument_buttons_container">
              <button
                className="calendar_btn"
                id="calendar_btn"
                onClick={() => {
                  setShowCalendar(!showCalendar);
                  // try {
                  //   if (
                  //     document.getElementById("calendar").style.visibility ===
                  //     "visible"
                  //   ) {
                  //     document.getElementById("calendar").style.visibility =
                  //       "hidden";
                  //   } else if (
                  //     document.getElementById("calendar").style.visibility ===
                  //     "hidden"
                  //   ) {
                  //     document.getElementById("calendar").style.visibility =
                  //       "visible";
                  //   }
                  // } catch {
                  //   console.log("null");
                  // }
                }}
              >
                <label id="count"></label>
                <img
                  className="instrument_icon_2"
                  src="https://em-content.zobj.net/thumbs/120/apple/354/spiral-calendar_1f5d3-fe0f.png"
                  alt="Календарь"
                />
                <img
                  className="arrow_icon"
                  src="https://img.icons8.com/?size=512&id=39808&format=png"
                  alt="Перейти"
                />
                <span className="instrument_title">Календарь</span>
              </button>
              <button
                className="timer_btn"
                onClick={() => {
                  setShowPomodoro(!showPomodoro);
                  // try {
                  //   if (
                  //     document.getElementById("timer").style.visibility ===
                  //     "visible"
                  //   ) {
                  //     document.getElementById("timer").style.visibility =
                  //       "hidden";
                  //   } else if (
                  //     document.getElementById("timer").style.visibility ===
                  //     "hidden"
                  //   ) {
                  //     document.getElementById("timer").style.visibility =
                  //       "visible";
                  //   }
                  // } catch {
                  //   console.log("null");
                  // }
                }}
              >
                <img
                  className="instrument_icon_2"
                  src="https://em-content.zobj.net/thumbs/120/apple/354/hourglass-not-done_23f3.png"
                  alt="Таймер"
                />
                <img
                  className="arrow_icon"
                  src="https://img.icons8.com/?size=512&id=39808&format=png"
                  alt="Перейти"
                />
                <span className="instrument_title">Таймер</span>
              </button>
              <button
                className="notes_btn"
                onClick={() => {
                  setShowNotes(!showNotes);
                  // try {
                  //   if (
                  //     document.getElementById("notes").style.visibility ===
                  //     "visible"
                  //   ) {
                  //     document.getElementById("notes").style.visibility =
                  //       "hidden";
                  //   } else if (
                  //     document.getElementById("notes").style.visibility ===
                  //     "hidden"
                  //   ) {
                  //     document.getElementById("notes").style.visibility =
                  //       "visible";
                  //   }
                  // } catch {
                  //   console.log("null");
                  // }
                }}
              >
                <img
                  className="instrument_icon_2"
                  src="https://em-content.zobj.net/thumbs/120/apple/354/pencil_270f-fe0f.png"
                  alt="Заметки"
                />
                <img
                  className="arrow_icon"
                  src="https://img.icons8.com/?size=512&id=39808&format=png"
                  alt="Перейти"
                />
                <span className="instrument_title">Заметки</span>
              </button>
              <button
                className="todo_btn"
                onClick={() => {
                  setShowTodo(!showTodo);
                  // try {
                  //   if (
                  //     document.getElementById("todo").style.visibility ===
                  //     "visible"
                  //   ) {
                  //     document.getElementById("todo").style.visibility =
                  //       "hidden";
                  //   } else if (
                  //     document.getElementById("todo").style.visibility ===
                  //     "hidden"
                  //   ) {
                  //     document.getElementById("todo").style.visibility =
                  //       "visible";
                  //   }
                  // } catch {
                  //   console.log("null");
                  // }
                }}
              >
                <img
                  className="instrument_icon_2"
                  src="https://em-content.zobj.net/thumbs/120/apple/354/briefcase_1f4bc.png"
                  alt="Список дел"
                />
                <img
                  className="arrow_icon"
                  src="https://img.icons8.com/?size=512&id=39808&format=png"
                  alt="Перейти"
                />
                <span className="instrument_title_2">Дела</span>
              </button>
              <button
                className="video_btn"
                onClick={() => {
                  setShowVideo(!showVideo);
                  // try {
                  //   if (
                  //     document.getElementById("video").style.visibility ===
                  //     "visible"
                  //   ) {
                  //     document.getElementById("video").style.visibility =
                  //       "hidden";
                  //   } else if (
                  //     document.getElementById("video").style.visibility ===
                  //     "hidden"
                  //   ) {
                  //     document.getElementById("video").style.visibility =
                  //       "visible";
                  //   }
                  // } catch {
                  //   console.log("null");
                  // }
                }}
              >
                <img
                  className="instrument_icon_2"
                  src="https://em-content.zobj.net/thumbs/120/apple/354/film-frames_1f39e-fe0f.png"
                  alt="Видео"
                />
                <img
                  className="arrow_icon"
                  src="https://img.icons8.com/?size=512&id=39808&format=png"
                  alt="Перейти"
                />
                <span className="instrument_title_2">Видео</span>
              </button>
              <button
                className="sound_btn"
                onClick={() => {
                  setShowAudio(!showAudio);
                  // try {
                  //   if (
                  //     document.getElementById("audio").style.visibility ===
                  //     "visible"
                  //   ) {
                  //     document.getElementById("audio").style.visibility =
                  //       "hidden";
                  //   } else if (
                  //     document.getElementById("audio").style.visibility ===
                  //     "hidden"
                  //   ) {
                  //     document.getElementById("audio").style.visibility =
                  //       "visible";
                  //   }
                  // } catch {
                  //   console.log("null");
                  // }
                }}
              >
                <img
                  className="instrument_icon_2"
                  src="https://em-content.zobj.net/thumbs/120/apple/354/headphone_1f3a7.png"
                  alt="Звуки"
                />
                <img
                  className="arrow_icon"
                  src="https://img.icons8.com/?size=512&id=39808&format=png"
                  alt="Перейти"
                />
                <span className="instrument_title_2">Звуки</span>
              </button>
            </div>
          </div>
        )}
        {!showPomodoro && (
          <Draggable>
            <div className="timer_space" id="timer">
              <MainPagePomodoro
                updateConfigure={updateConfigure}
                pomodoro={pomodoro}
                pomoBreak={pomoBreak}
              />
              {isConfigure && (
                <ConfigurePage
                  updateConfigure={updateConfigure}
                  updatePomodoro={updatePomodoro}
                />
              )}
            </div>
          </Draggable>
        )}
        {!showNotes && (
          <Draggable>
            <div className="notes_space">
              <img
                className="notes_icon"
                src="https://img.icons8.com/?size=512&id=Vk1hVre0P58T&format=png"
                alt="Календарь"
              />
              <span className="notes_instrument_title">Заметки</span>
              <textarea className="notes_text"></textarea>
            </div>
          </Draggable>
        )}
        {!showTodo && (
          <Draggable>
            <div className="todo_space" id="todo">
              <div className="todo_container">
                {todos.map((todo) => (
                  <DisplayTodo
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                  />
                ))}
              </div>
              <AddTodo />
            </div>
          </Draggable>
        )}
        {!showCall && (
          <Draggable>
            <div className="create_call_container">
              <div className="dashboard_content_container" id="call">
                <Call />
                {callState !== callStates.CALL_IN_PROGRESS && (
                  <CallInfo username={username} />
                )}
                <GroupCall />
              </div>

              <div className="dashboard_rooms_container">
                <GroupCallRoomsList />
              </div>
            </div>
          </Draggable>
        )}

        {!showCalendar && (
          <Draggable>
            <div className="calendar_space">
              <LoginSignout />
            </div>
          </Draggable>
        )}
        {!showAudio && (
          <Draggable>
            <div className="audio_space">
              <AudioPlayer />
            </div>
          </Draggable>
        )}
        {!showVideo && (
          <Draggable>
            <div className="video_space">
              <VideoPlayer />
            </div>
          </Draggable>
        )}
      </div>

      <div className="mainpage_users_list_closed" id="users_list_closed">
        <button
          className="open_users_list"
          onClick={() => {
            openListUsers();
          }}
        />
        <UsersListClosed />
      </div>
      <div className="dashboard_active_users_list" id="users_list">
        <div className="header_users_list" style={{ height: "10%" }}>
          <button
            className="close_users_list"
            onClick={() => {
              closeListUsers();
            }}
          ></button>
          <div
            className="label_users"
            style={{ position: "relative", top: "35px", left: "20px" }}
          >
            <label style={{ position: "relative" }}>Участники</label>
          </div>
        </div>

        <UsersList />
      </div>
    </div>
  );
};

const mapStateToProps = ({ call, mainpage }) => ({
  ...call,
  ...mainpage,
});

export default connect(mapStateToProps)(MainPage);
