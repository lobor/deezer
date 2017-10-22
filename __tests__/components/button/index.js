import React from 'react';
import Button from 'components/button';
import renderer from 'react-test-renderer';

describe('test component button', () => {
  it('test render with text', () => {
    const component = renderer.create(
      <Button>Toto</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('test render primary', () => {
    const component = renderer.create(
      <Button primary />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
