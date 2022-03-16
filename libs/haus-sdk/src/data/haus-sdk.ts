import axios, { AxiosResponse } from 'axios';

interface NetworkEndpoints {
  provider: string;
  graphUrl: string;
}

interface NetworkConfig {
  [path: string]: NetworkEndpoints;
}

class Haus {
  networkConfig!: NetworkConfig;

  static async create(networkConfig: NetworkConfig): Promise<Haus> {
    const hausSdk = new Haus();
    await hausSdk.init(networkConfig);
    return hausSdk;
  }

  private async init(networkConfig: NetworkConfig): Promise<void> {
    this.networkConfig = networkConfig;
  }

  async getDao(daoAddress: string, networkId: string): Promise<AxiosResponse> {
    // move out into a fetch function that returns error or data? or data or empty {}?
    // try {
    const res = await axios.post(this.networkConfig[networkId].graphUrl, {
      query: `{dao(id: "${daoAddress}") {id}}`,
    });

    return res;
    // } catch (error) {
    //   console.error(error);
    //   return error;
    // }
  }
}

export default Haus;
