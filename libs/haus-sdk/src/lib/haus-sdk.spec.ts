import Haus from './haus-sdk';

describe('hausSdk', () => {
  it('can init with network params', async () => {
    const params = {
      provider: 'yolo',
      graphUrl:
        'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-rinkeby',
    };
    const haus = await Haus.create(params);

    expect(haus.provider).toEqual(params.provider);
    expect(haus.graphUrl).toEqual(params.graphUrl);
  });

  it('returns dao address', async () => {
    const params = {
      provider: 'yolo',
      graphUrl:
        'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-rinkeby',
    };
    const daoAddress = 'poopin';
    const haus = await Haus.create(params);
    const res = await haus.getDao(daoAddress);

    expect(res).toEqual(daoAddress);
  });
});
