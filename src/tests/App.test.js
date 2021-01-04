import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from '../components/app/App';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

test('renders w/o crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
  unmountComponentAtNode(div);
});

test('app component matches snapshot', () => {

  const component = renderer.create(<App />);
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();

});