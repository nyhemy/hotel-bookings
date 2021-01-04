import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import { unmountComponentAtNode } from 'react-dom';
import RoomCreate from '../components/roomCreate/RoomCreate';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

const history = createMemoryHistory();

test('renders w/o crashing', () => {

    render(
        <Router history={history}>
            <RoomCreate />
        </Router>,
    );
});

test('app component matches snapshot', () => {
    const component = renderer.create(<RoomCreate />);
    let tree = component.toJSON();
  
    expect(tree).toMatchSnapshot();
  
});

test('verify that form invalidates', () => {

    const{ getByText } = render(<Router history={history}><RoomCreate /></Router>);
  
    fireEvent.click(getByText('Create'));
  
    expect(getByText('Must be at least 3 characters')).toBeInTheDocument();
    expect(getByText('Must be number greater than zero')).toBeInTheDocument();
  
});