import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import { findByTestAttrReactWrapper } from '../../tests/testUtils';
import AddTodo from './AddTodo';

const setup = (): ReactWrapper => {
  return mount(<AddTodo />);
};

describe('Render components', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  it('renders without crashing', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'add-todo');
    expect(component.length).toBe(1);
  });

  it('renders input text', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'add-todo-input');
    expect(component.length).toBe(1);
  });

  it('renders without crashing', () => {
    const component = findByTestAttrReactWrapper(
      wrapper,
      'add-todo-submit-button'
    );
    expect(component.length).toBe(1);
  });
});
