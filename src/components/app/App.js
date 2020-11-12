import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from '../nav/Nav';
import Login from '../login/Login';
import Logout from '../logout/Logout';
import Reservations from '../reservations/Reservations';
import Rooms from '../rooms/Rooms';
import NotFound from '../notFound/NotFound';

/**
 * 
 * @param {*} props 
 */
const App = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token") && !loggedIn) {
      setLoggedIn(true);
    }

    if (sessionStorage.getItem("role") === "manager" && !loggedIn) {
      setIsManager(true);
    }
  }, [loggedIn]);
  
  return (
    <Router>
      <Nav loggedIn={loggedIn} isManager={isManager}/>

      <Switch>
        <Route exact path="/" render={() => <Login login={(bool) => setLoggedIn(bool)} loggedIn={loggedIn} isManager={(bool) => setIsManager(bool)} />}/>
        <Route exact path="/reservations" component={Reservations} />
        <Route exact path="/room-types" component={Rooms} />
        <Route exact path="/logout" render={() => <Logout logout={(bool) => setLoggedIn(bool)} />} />
        <Route path="*" component={NotFound} />
      </Switch>

    </Router>
  );
}

export default App;
