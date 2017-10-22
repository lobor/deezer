import React from 'react';
import ItemHeader from 'components/datagrid/itemHeader';
import renderer from 'react-test-renderer';

describe('test components itemHeader', () => {
  it('test render', () => {
    const component = renderer.create(
      <ItemHeader title="Toto" />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('test render width filter', () => {
    const filter = jest.mock();
    const sort = jest.mock();
    const component = renderer.create(
      <ItemHeader title="Toto" filter={filter} sort={sort} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('test render width sort', () => {
    const component = renderer.create(
      <ItemHeader title="Toto" />
    );
    let tree = component.toJSON();
    tree.props.sort = jest.fn();
    tree.props.onClick({ target: { tagName: 'TD' } });
    tree.props.onClick({ target: { tagName: 'TD' } });
    tree.props.onClick({ target: { tagName: 'TD' } });
  })
})
