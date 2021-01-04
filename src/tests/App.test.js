import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from '../components/app/App';
import '@testing-library/jest-dom/extend-expect';

it('renders w/o crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
  unmountComponentAtNode(div);
});
