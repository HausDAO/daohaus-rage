import * as HausUtils from './utils';

describe('hausUtils', () => {
  it('exists', async () => {
    expect(HausUtils.defaultEncode).toBeTruthy();
  });

  it('can encode', async () => {
    const typesArray = ['uint32', 'uint32'];
    const argArray = [120, 60];

    const res = HausUtils.defaultEncode(typesArray, argArray);

    expect(res).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000078000000000000000000000000000000000000000000000000000000000000003c'
    );
  });
});
