import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from '../nav/Nav';
import Login from '../login/Login';
import Logout from '../logout/Logout';
import Reservations from '../reservations/Reservations';
import NotFound from '../notFound/NotFound';
import RoomTypes from '../roomTypes/RoomTypes';
import ReservationCreate from '../reservationCreate/ReservationCreate';
import RoomCreate from '../roomCreate/RoomCreate';

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

    if (sessionStorage.getItem("role") === "manager" && loggedIn) {
      setIsManager(true);
    } else {
      setIsManager(false);
    }
  }, [loggedIn, isManager]);
  
  return (
    <Router>
      <Nav loggedIn={loggedIn} isManager={isManager}/>

      <Switch>
        <Route exact path="/" render={() => <Login login={(bool) => setLoggedIn(bool)} loggedIn={loggedIn} isManager={(bool) => setIsManager(bool)} />}/>
        <Route exact path="/reservations" component={Reservations} />
        <Route exact path="/reservations/create" component={ReservationCreate} />
        <Route exact path="/reservations/edit/:id" />
        <Route exact path="/room-types" component={RoomTypes} />
        <Route exact path="/room-types/create" component={RoomCreate} />
        <Route exact path="/logout" render={() => <Logout logout={(bool) => setLoggedIn(bool)} />} />
        <Route path="*" component={NotFound} />
      </Switch>

    </Router>
  );
}

export default App;
