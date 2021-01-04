import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import RoomTypes from '../components/roomTypes/RoomTypes';
import '@testing-library/jest-dom/extend-expect';

it('renders w/o crashing', () => {
    const div = document.createElement('div');
    render(<RoomTypes />, div);
    unmountComponentAtNode(div);
});