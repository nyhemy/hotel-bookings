import React from 'react';

const Reservation = (props) => {
    const {checkInDate, guestEmail, id, numberOfNights, roomTypeId, user} = props;

    return (
        <div>
            <div>{checkInDate}</div>
            <div>{guestEmail}</div>
            <div>{numberOfNights}</div>
            <div>{roomTypeId}</div>
            <div>{user}</div>
        </div>
    );
}

export default Reservation;