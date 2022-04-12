import Query from './Query';
import { KeyChain } from './types';

class Haus {
  providers!: KeyChain;
  query: Query;

  private constructor(providers: KeyChain) {
    this.providers = providers;

    this.query = new Query();
  }

  static create(networkConfig: KeyChain): Haus {
    const hausSdk = new Haus(networkConfig);
    return hausSdk;
  }
}

export default Haus;
