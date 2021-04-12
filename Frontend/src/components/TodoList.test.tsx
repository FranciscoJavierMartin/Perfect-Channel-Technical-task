import { ReactWrapper, mount } from 'enzyme';
import React from 'react';
import { findByTestAttrReactWrapper } from '../../tests/testUtils';
import TodoList, { TodoListProps } from './TodoList';

const setup = (props: TodoListProps): ReactWrapper => {
  return mount(<TodoList {...props} />);
};

describe('Render components', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup({
      image: 'success',
      imageAlt: 'Success alternative text',
      message: 'You have completed all your goals. Congrats!',
      title: 'Pending TO-DO',
      todos: [],
    });
  });

  it('renders without crashing', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'Pending TO-DO');
    expect(component.length).toBe(1);
  });

  it('renders title', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'title');
    expect(component.length).toBe(1);
  });
});
