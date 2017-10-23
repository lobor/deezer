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
    picture: 'picture'
  },
  {
    title: 'barr',
    artist: 'foo',
    picture: 'picture'
  },
  {
    title: 'zoro',
    artist: 'LMFAO',
    picture: 'picture'
  }
]

describe('datagrid button', () => {
  it('render without data', () => {
    const component = renderer.create(
      <Datagrid header={headerDatagrid} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('render with data', () => {
    const component = renderer.create(
      <Datagrid header={headerDatagrid} showResult={datas} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('loading', () => {
    const component = renderer.create(
      <Datagrid header={headerDatagrid} loading={true} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('failed', () => {
    const component = renderer.create(
      <Datagrid header={headerDatagrid} failed={true} />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('sort, click on item', () => {
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    const component = renderer.create(
      <Datagrid header={headerDatagrid} showResult={datas} />
    );
    let instance = component.getInstance();
    instance.enable({ currentTarget: { previousSibling: 'toto' }});
    expect(instance.elSlider).toEqual('toto')
    expect(window.addEventListener).toHaveBeenCalled()
    component.getInstance().disable();
    expect(instance.elSlider).toBeNull()
    expect(window.removeEventListener).toHaveBeenCalled()
    instance.enable({ currentTarget: { previousSibling: { offsetLeft: 10, style: {} } }});
    instance.move({ screenX: 200 });
    expect(instance.elSlider.style.width).toEqual('188px')
  })
})
