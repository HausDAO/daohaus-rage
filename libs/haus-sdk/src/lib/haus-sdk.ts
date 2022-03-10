export function hausSdk(): string {
  return 'poopin';
}

// interface NetworkParams {
//   provider: string;
//   graphEndpoint: string;
// }

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

  async getDao(daoAddress: string): Promise<string> {
    return daoAddress;
  }
}

export default Haus;
