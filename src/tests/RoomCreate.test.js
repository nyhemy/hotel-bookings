import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import RoomCreate from '../components/roomCreate/RoomCreate';
import '@testing-library/jest-dom/extend-expect';

it('renders w/o crashing', () => {
  const div = document.createElement('div');
  render(<RoomCreate />, div);
  unmountComponentAtNode(div);
});
