import React from 'react';
import { render } from '@testing-library/react';
// import { unmountComponentAtNode } from 'react-dom';
import RoomTypes from '../components/roomTypes/RoomTypes';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

it('renders w/o crashing', () => {
    const history = createMemoryHistory();
    render(
        <Router history={history}>
            <RoomTypes />
        </Router>
    );
});