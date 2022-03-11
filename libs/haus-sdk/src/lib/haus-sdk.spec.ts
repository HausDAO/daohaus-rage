import Haus from './haus-sdk';

describe('hausSdk', () => {
  // TODO: how to deal with env variables
  // users will need to pass those in
  const networkConfig = {
    '0x4': {
      provider: 'https://<somekey>.rinkeby.rpc.rivet.cloud',
      graphUrl:
        'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-rinkeby',
    },
    '0x64': {
      provider: 'https://rpc.gnosischain.com',
      graphUrl:
        'https://api.thegraph.com/subgraphs/name/hausdao/daohaus-v3-xdai',
    },
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(networkConfig);
  });

  it('can init with network networkConfig', async () => {
    expect(haus.networkConfig['0x4'].provider).toEqual(
      networkConfig['0x4'].provider
    );
    expect(haus.networkConfig['0x4'].graphUrl).toEqual(
      networkConfig['0x4'].graphUrl
    );
  });

  it('returns dao address', async () => {
    const daoAddress = '0x01bdc8eb83282f2ea61bf3387b24a8e760411655';
    const networkId = '0x4';

    const res = await haus.getDao(daoAddress, networkId);

    expect(res.data.data.dao.id).toEqual(daoAddress);
  });
});
