import React, { useState } from "react";
const ConfigurePage = (props) => {
    const { updateConfigure, updatePomodoro } = props;
  const [pomodoro, setPomodoro] = useState("");
  const [pomoBreak, setPomoBreak] = useState("");
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (pomodoro === "" || pomoBreak === "") return;
    updateConfigure(false);
    updatePomodoro(pomodoro, pomoBreak);
  };
  const changeConfigure = () => {
    updateConfigure(false);
  };
  return (
    <div className="configure__section">
      
          <h2 className="settings_label">Настройки</h2>
          <p onClick={changeConfigure}>
          </p>
        
        <form className="configure_section_form" onSubmit={onSubmitForm}>
          <div className="configure_section_form_div">
            <label className="focus_time_label">Фокус (в минутах):</label>
            <input className="input_focus_time"
              type="number"
              onChange={(e) => {
                setPomodoro(e.target.value);
              }}
              value={pomodoro}
              required
              maxLength="2"
              minLength="0"
              max="59"
              min="0"
              step="1"
            />
          </div>
          <div className="break_time_container">
            <label className="break_time_label">Перерыв (в минутах):</label>
            <input className="break_time_input"
              type="number"
              onChange={(e) => {
                setPomoBreak(e.target.value);
              }}
              value={pomoBreak}
              required
              maxLength="2"
              minLength="0"
              max="59"
              min="0"
              step="1"
            />
          </div>
          <div className="configure_section_btn">
            <button className="submit-btn">Применить</button>
          </div>
        </form>
    </div>
  )
}

export default ConfigurePage