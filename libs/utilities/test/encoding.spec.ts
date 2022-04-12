import { defaultEncode } from '../src/index';

describe('hausUtils', () => {
  it('can encode', async () => {
    const typesArray = ['uint32', 'uint32'];
    const argArray = [120, 60];

    const res = defaultEncode(typesArray, argArray);

    expect(res).toEqual(
      '0x0000000000000000000000000000000000000000000000000000000000000078000000000000000000000000000000000000000000000000000000000000003c'
    );
  });
});
