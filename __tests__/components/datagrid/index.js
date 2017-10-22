import React from 'react';
import Datagrid from 'components/datagrid';
import renderer from 'react-test-renderer';

const headerDatagrid = [
  {
    title: '',
    key: 'picture',
    type: 'img'
  },
  {
    title: 'Titre',
    key: 'title'
  },
  {
    title: 'Artist',
    key: 'artist'
  }
];

const datas = [
  {
    title: 'Toto',
    artist: 'Titi',
    picture: 'haha'
  }
]

describe('test datagrid button', () => {
  it('test render', () => {
    const component = renderer.create(
      <Datagrid header={headerDatagrid} showResult={datas} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
