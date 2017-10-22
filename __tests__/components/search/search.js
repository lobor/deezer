import React from 'react';
import Search from 'components/search';
import renderer from 'react-test-renderer';

describe('test search button', () => {
  it('test render', () => {
    const component = renderer.create(
      <Search />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('check submit', () => {
    let submit = jest.fn();
    const component = renderer.create(
      <Search submit={submit} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.onSubmit()
    expect(submit).toBeCalled();
  })
})
