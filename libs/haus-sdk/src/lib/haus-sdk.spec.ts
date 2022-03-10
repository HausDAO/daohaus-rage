import Haus from './haus-sdk';

describe('hausSdk', () => {
  const params = {
    provider: 'yolo',
    graphUrl:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-rinkeby',
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(params);
  });

  it('can init with network params', async () => {
    expect(haus.provider).toEqual(params.provider);
    expect(haus.graphUrl).toEqual(params.graphUrl);
  });

  it('returns dao address', async () => {
    const daoAddress = 'poopin';
    const res = await haus.getDao(daoAddress);

    expect(res).toEqual(daoAddress);
  });
});
