import Haus from './haus-sdk';

describe('hausSdk', () => {
  const params = {
    provider: 'yolo',
    graphUrl:
      'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-rinkeby',
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
    const daoAddress = '0x01bdc8eb83282f2ea61bf3387b24a8e760411655';

    const res = await haus.getDao(daoAddress);

    expect(res.data.data.dao.id).toEqual(daoAddress);
  });
});
