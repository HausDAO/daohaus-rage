import { Haus } from '../src/index';

describe('hausSdkRage', () => {
  const rpcConfig = {
    '0x4': 'https://<somekey>.rinkeby.rpc.rivet.cloud',
    '0x64': 'https://rpc.gnosischain.com',
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(rpcConfig);
  });
  it('should init', () => {
    expect(haus.providers['0x4']).toEqual(rpcConfig['0x4']);
  });

  it('should have a query class', () => {
    expect(haus.query).toBeTruthy();
  });

  it('can fetch the latest transaction', async () => {
    const networkId = '0x4';
    const query = `
      query eventTransaction {
        eventTransactions(first: 1,
          orderBy: createdAt, orderDirection: desc) {
          id
          createdAt
        }
      }
    `;

    const res = await haus.query.graphFetch({
      networkId,
      query,
    });

    expect(res.data.eventTransactions.length).toEqual(1);
  });

  it('can fetch a dao overview', async () => {
    const networkId = '0x4';
    const dao = '0x01bdc8eb83282f2ea61bf3387b24a8e760411655';

    const res = await haus.query.dao({
      networkId,
      dao,
    });

    expect(res.data.dao.shareTokenName).toEqual('8Baal Shares');
  });

  it('can fetch a dao proposals', async () => {
    const networkId = '0x4';
    const dao = '0xfe53688bf0a5b5be52cc6d2c6c715b3d8b312364';

    const res = await haus.query.proposals({
      networkId,
      dao,
    });

    console.log('res', res);

    expect(res.data.proposals.length).toBeGreaterThan(10);
  });
});
