// import './App.css';
import {BrowserRouter as Router,
Switch,
Route
} from 'react-router-dom';
import {useEffect} from 'react';
import {connectWithWebSocket} from './utils/wssConnection/socketConnection';
import MainPage from './Dashboard/Main';
import StartPage from './LoginPage/StartPage';

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
