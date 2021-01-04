import React from 'react';
import { render } from '@testing-library/react';
// import { unmountComponentAtNode } from 'react-dom';
import RoomCreate from '../components/roomCreate/RoomCreate';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import 'react-test-renderer';

test('renders w/o crashing', () => {
    const history = createMemoryHistory();

    render(
        <Router history={history}>
            <RoomCreate />
        </Router>,
    );
});
