import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import { findByTestAttrReactWrapper } from '../tests/testUtils';
import App from './App';

const setup = (): ReactWrapper => {
  return mount(<App />);
};

describe('Render components', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('renders without crashing', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'component-app');
    expect(component.length).toBe(1);
  });

  it('render title', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'title-app');
    expect(component.length).toBe(1);
  });

  it('render "Add TODO"', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'add-todo');
    expect(component.length).toBe(1);
  });

  it('render "Pending" button', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'Pending');
    expect(component.length).toBe(1);
  });

  it('render "Completed" button', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'Completed');
    expect(component.length).toBe(1);
  });

});
