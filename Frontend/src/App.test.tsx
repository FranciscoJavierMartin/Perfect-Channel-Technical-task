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

  it('render "Pending" TODOS', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'Pending TO-DO');
    expect(component.length).toBe(1);
  });

  it('Not render "Completed" TODOS', () => {
    const component = findByTestAttrReactWrapper(wrapper, 'Completed TO-DO');
    expect(component.length).toBe(0);
  });
});

it('Change TODO list when click the button', () => {
  const wrapper: ReactWrapper = setup();

  const componentPendingTODO = findByTestAttrReactWrapper(wrapper, 'Pending TO-DO');
  expect(componentPendingTODO.length).toBe(1);

  const componentCompletedTODO = findByTestAttrReactWrapper(wrapper, 'Completed TO-DO');
  expect(componentCompletedTODO.length).toBe(0);

  const completedButton = findByTestAttrReactWrapper(wrapper, 'Completed');
  completedButton.simulate('click');

  const componentPendingTODOAfter = findByTestAttrReactWrapper(wrapper, 'Pending TO-DO');
  expect(componentPendingTODOAfter.length).toBe(0);

  const componentCompletedTODOAfter = findByTestAttrReactWrapper(wrapper, 'Completed TO-DO');
  expect(componentCompletedTODOAfter.length).toBe(1);
})