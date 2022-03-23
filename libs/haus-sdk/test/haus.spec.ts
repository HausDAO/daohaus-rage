import Haus from '../src/index';

describe('hausSdk', () => {
  const rpcConfig = {
    '0x4': 'https://<somekey>.rinkeby.rpc.rivet.cloud',
    '0x64': 'https://rpc.gnosischain.com',
  };
  let haus: Haus;

  beforeAll(async () => {
    haus = await Haus.create(rpcConfig);
  });

  it('can init with network networkConfig', async () => {
    expect(haus.rpcEndpoints['0x4']).toEqual(rpcConfig['0x4']);
  });

  it('returns dao address', async () => {
    const daoAddress = '0x01bdc8eb83282f2ea61bf3387b24a8e760411655';

    const networkId = '0x4';

    const res = await haus.dao({ daoAddress, networkId });

    expect(res.id).toEqual(daoAddress);
  });

  it('can fetch dao by summon transaction hash', async () => {
    const entity = 'daos';
    const fields = '{id metaData { name }}';
    const whereQuery = {
      transactionHashSummon:
        '0x32e489fb63a594bca0f1a8c671a942acf25fb6b0aecb9b110c8c557b1ac3aa0c',
    };
    const networkId = '0x4';

    const res = await haus.getByQuery({
      entity,
      whereQuery,
      fields,
      networkId,
    });

    expect(res[0].id).toEqual('0x02515f07132f9bb6a30364d7dcb14f1b8f916f81');
    expect(res[0].metaData.name).toEqual('sam dao');
  });

  it('can fetch dao with AND queries', async () => {
    const entity = 'daos';
    const whereQuery = {
      transactionHashSummon:
        '0x32e489fb63a594bca0f1a8c671a942acf25fb6b0aecb9b110c8c557b1ac3aa0c',
      lootAddress: '0xd33c8253f0cf546d36df123e3cd1f08bcf94474d',
    };
    const fields = '{id metaData { name }}';
    const networkId = '0x4';

    const res = await haus.getByQuery({
      entity,
      whereQuery,
      fields,
      networkId,
    });

    expect(res[0].id).toEqual('0x02515f07132f9bb6a30364d7dcb14f1b8f916f81');
  });

  it('can fetch a propsosal by id and it hydrates status', async () => {
    const proposalId = '0x067c7885df54e92884221b67901c3daeab3c6a1c-proposal-1';
    const networkId = '0x4';

    const res = await haus.proposal({
      proposalId,
      networkId,
    });

    console.log('res', res);

    expect(res.id).toEqual(
      '0x067c7885df54e92884221b67901c3daeab3c6a1c-proposal-1'
    );
    expect(res.createdAt).toEqual('1647465504');

    expect(res.status).toEqual('Passed');
  });
});
