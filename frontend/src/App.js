// import './App.css';
import {BrowserRouter as Router,
Switch,
Route
} from 'react-router-dom';
import {useEffect} from 'react';
import {connectWithWebSocket} from './connection/socketConnection/socketConnection';
import MainPage from './mainPage/Main';
import StartPage from './startPage/StartPage';

function App() {
  useEffect(() => {
    connectWithWebSocket();
  },[]);
  return (
    <Router>
      <Switch>
        <Route path='/room'>
          <MainPage/>
        </Route>
        <Route path='/'>
          <StartPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
