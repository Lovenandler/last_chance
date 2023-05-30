import React from 'react'
import Main from './Main.js'
const MainPage = (props) => {
    const { updateConfigure, pomodoro, pomoBreak } = props;
  return (
    <div className='main_section'>
        <Main
        updateConfigure={updateConfigure}
        pomodoro={pomodoro}
        pomoBreak={pomoBreak}
      />
    </div>
  )
}

export default MainPage