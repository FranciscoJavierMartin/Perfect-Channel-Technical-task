import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import { findByTestAttrReactWrapper } from '../tests/testUtils';
import App from './App';

const setup = (): ReactWrapper => {
  return mount(<App />);
};

it('renders without crashing', () => {
  const wrapper = setup();
  const component = findByTestAttrReactWrapper(wrapper, 'component-app');
  expect(component.length).toBe(1);
});
