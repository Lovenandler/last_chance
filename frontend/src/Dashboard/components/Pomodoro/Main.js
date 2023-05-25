/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./ConfigurePage";
const Main = (props) => {
  const { updateConfigure, pomodoro, pomoBreak } = props;
  const [isPlay, setIsPlay] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  const [_interval, _setInterval] = useState(0);
  const [_remainingTimeinMs, _setRemainingTimeinMs] = useState(0);
  const configureTime = (_session, _break) => {
    if (!isBreak) {
      _session < 10 ? setMinutes(`0${_session}`) : setMinutes(pomodoro);
      setSeconds("00");
    } else {
      _break < 10 ? setMinutes(`0${_break}`) : setMinutes(_break);
      setSeconds("00");
    }
  };
  /**
   * Countdown function to count the time.
   */
  const countDownFunction = (_endTime) => {
    let remainingTimeinMs = _endTime - Date.now();
    _setRemainingTimeinMs(remainingTimeinMs);
    let remainingTimeinS = Math.round(remainingTimeinMs / 1000);
    //Preparing for the two digits minutes & seconds
    let _tempMinute = Math.floor(remainingTimeinS / 60);
    let _tempSeconds = Math.floor(remainingTimeinS % 60);
    _tempMinute < 10 ? setMinutes(`0${_tempMinute}`) : setMinutes(_tempMinute);
    _tempSeconds < 10
      ? setSeconds(`0${_tempSeconds}`)
      : setSeconds(_tempSeconds);
  };
  // Changing the play/pause btn
  const changePlayBtn = () => {
    if (minutes === "00" && seconds === "00") return;
    setIsPlay(!isPlay);
    if (!isPlay) {
      let totalTimeinMs = _remainingTimeinMs;
      let _endTime = totalTimeinMs + Date.now();
      _setInterval(
        setInterval(() => {
          countDownFunction(_endTime);
        }, 100)
      );
    } else {
      clearInterval(_interval);
    }
  };
  //Timer Restart functionality
  const restartFunction = () => {
    configureTime(pomodoro, pomoBreak);
    clearInterval(_interval);
    setIsPlay(false);
    setIsBreak(false);
    _setRemainingTimeinMs(pomodoro * 60000);
  };
  const changeConfigure = () => {
    restartFunction();
    updateConfigure(true);
  };
  // ChangingConfigure
  useEffect(() => {
    configureTime(pomodoro, pomoBreak);
    if (!isBreak) {
      _setRemainingTimeinMs(pomodoro * 60000);
    } else {
      _setRemainingTimeinMs(pomoBreak * 60000);
    }
  }, [pomodoro, pomoBreak, isBreak]);
  //useEffect
  useEffect(() => {
    if (
      minutes === "00" &&
      seconds === "00" &&
      _remainingTimeinMs < 1000 &&
      _remainingTimeinMs !== 0
    ) {
      clearInterval(_interval);
      setIsPlay(false);
      setIsBreak(!isBreak);
    }
  }, [minutes, seconds]);
  let changeStyle = () => {
    const timer = document.getElementById("configure_section");
    console.log(timer);
  };
  return (
    <div className="main__section">
      <div className="main__section--title">
        <div className="settings_info" onClick={changeConfigure}>
          <button className="settings_timer_btn" onClick={changeStyle}>
            <img
              className="settings_timer_icon"
              src="https://img.icons8.com/?size=512&id=PUULuXvUfB6u&format=png"
              alt="Настройки"
            />
          </button>
        </div>
          <h1 className="base_time_label">
            {minutes} : {seconds}
          </h1>
          <p className="base_time_name">{isBreak ? "Перерыв" : "Сессия"}</p>
        </div>
      <div className="main__section--icons">
        <div className="btn-play-pause" onClick={changePlayBtn}>
          {isPlay ? (
            <img
              className="play_icon"
              src="https://img.icons8.com/?size=512&id=6JY5zZtJducA&format=png"
              alt="Начать"
            />
          ) : (
            <div className="pause_timer_img">
              <img
                className="play_icon"
                src="https://img.icons8.com/?size=512&id=m2MbLIzl3AZD&format=png"
                alt="Стоп"
              />
            </div>
          )}
        </div>
        <div className="btn-restart" onClick={restartFunction}>
          <img
            className="restart_icon"
            src="https://img.icons8.com/?size=512&id=63815&format=png"
            alt="Сбросить"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
