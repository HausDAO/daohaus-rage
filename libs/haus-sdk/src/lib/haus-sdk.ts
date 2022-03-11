import axios, { AxiosResponse } from 'axios';

interface HausConfig {
  provider: string;
  graphUrl: string;
}

class Haus {
  provider!: string;
  graphUrl!: string;

  static async create({ provider, graphUrl }: HausConfig): Promise<Haus> {
    const hausSdk = new Haus();
    await hausSdk.init({
      provider,
      graphUrl,
    });
    return hausSdk;
  }

  private async init({ provider, graphUrl }: HausConfig): Promise<void> {
    this.provider = provider;
    this.graphUrl = graphUrl;
  }

  async getDao(daoAddress: string): Promise<AxiosResponse> {
    // try {
    const res = await axios.post(this.graphUrl, {
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
