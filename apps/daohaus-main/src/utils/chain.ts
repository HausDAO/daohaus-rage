// export const CHAIN = {
type Dict = {
  [index: string]: string | number | Dict | [string | number | Dict];
};

type DictFieldType = string | number | Dict | [string | number | Dict];
const CHAIN: { [networkId: string]: Dict } = {
  '0x1': {
    name: 'Mainnet',
    short_name: 'eth',
    nativeCurrency: 'ETH',
    network: 'mainnet',
    network_id: 1,
    chain_id: '0x1',
    hub_sort_order: 1,
    providers: ['walletconnect'],
    rpc_url: `https://${import.meta.env.VITE_RPC_URI}.eth.rpc.rivet.cloud/`,
    abi_api_url:
      'https://api.etherscan.io/api?module=contract&action=getabi&address=',
    tokenlist_api_url: 'https://api.etherscan.io/api',
    subgraph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus',
    stats_graph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats',
    boosts_graph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-boosts',
    erc721_graph_url:
      'https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc721-subgraph',
    erc1155_graph_url:
      'https://api.thegraph.com/subgraphs/name/sunguru98/mainnet-erc1155-subgraph',
    shaman_graph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-shamans-subgraph',
    minion_factory_addr: '0x88207Daf515e0da1A32399b3f92D128B1BF45294',
    moloch_factory_addr: '0x38064F40B20347d58b326E767791A6f79cdEddCe',
    dai_contract: '0x6b175474e89094c44da98b954eedeac495271d0f',
    wrapper_contract: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    wrap_n_zap_factory_addr: '0x4e521FF388c83b4c945a33984ba42Efb73Cc04e6',
    block_explorer: 'https://etherscan.io',
    rarible: {
      api_url: 'https://ethereum-api.rarible.org/v0.1',
      erc20_transfer_proxy: '0xb8e4526e0da700e9ef1f879af713d691f81507d8',
      nft_transfer_proxy: '0x4fee7b061c97c9c496b01dbce9cdb10c02f0a0be',
      base_url: 'https://rarible.com',
    },
    niftyMinion: {
      minion_factory_addr: '0x7EDfBDED3077Bc035eFcEA1835359736Fa342209',
      version: 'v1',
    },
    safeMinion: {
      minion_factory_addr: '0xbC37509A283E2bb67fd151c34E72e826C501E108',
      safe_mutisend_addr: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
      safe_sign_lib_addr: '0xa25b3579a295be016de5eb5F082b54B12d45F72C',
    },
    escrow_minion: '0xc9f9E7FC92A7D3B2b3554be850fFF462B7b382E7',
    disperse_app: '0xD152f549545093347A162Dce210e7293f1452150',
  },
  '0x4': {
    name: 'Rinkeby',
    short_name: 'rinkeby',
    nativeCurrency: 'ETH',
    network: 'rinkeby',
    network_id: 4,
    chain_id: '0x4',
    hub_sort_order: 6,
    providers: ['walletconnect'],
    // , 'portis', 'fortmatic'
    rpc_url: `https://${import.meta.env.VITE_RPC_URI}.rinkeby.rpc.rivet.cloud/`,
    abi_api_url:
      'https://api-rinkeby.etherscan.io/api?module=contract&action=getabi&address=',
    tokenlist_api_url: 'https://api-rinkeby.etherscan.io/api',
    subgraph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-rinkeby',

    stats_graph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-stats-rinkeby',
    boosts_graph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-boosts-rinkeby',
    erc721_graph_url:
      'https://api.thegraph.com/subgraphs/name/sunguru98/erc721-rinkeby-subgraph',
    erc1155_graph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/erc1155-rinkeby-subgraph',
    shaman_graph_url:
      'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-shamans-rinkeby',
    minion_factory_addr: '0x313F02A44089150C9ff7011D4e87b52404A914A9',
    moloch_factory_addr: '0xC33a4EfecB11D2cAD8E7d8d2a6b5E7FEacCC521d',
    dai_contract: '0x95b58a6bff3d14b7db2f5cb5f0ad413dc2940658',
    wrapper_contract: '0xc778417e063141139fce010982780140aa0cd5ab',
    wrap_n_zap_factory_addr: '0x4e521FF388c83b4c945a33984ba42Efb73Cc04e6',
    block_explorer: 'https://rinkeby.etherscan.io',
    safeMinion: {
      minion_factory_addr: '0x3f13ABc8931c0e381Ce6d1Be9f978aE6E9d99Cb8',
      safe_mutisend_addr: '0xA238CBeb142c10Ef7Ad8442C6D1f9E89e07e7761',
      safe_sign_lib_addr: '0xa25b3579a295be016de5eb5F082b54B12d45F72C',
    },
    superfluid: {
      minion_factory_addr: '0x4b168c1a1E729F4c8e3ae81d09F02d350fc905ca',
      resolver: '0x659635Fab0A0cef1293f7eb3c7934542B6A6B31A',
      subgraph_url:
        'https://api.thegraph.com/subgraphs/name/superfluid-finance/superfluid-rinkeby',
      superapp_addr: {
        v1: '0x7d8151FAB5D6742F1c574fff472B6794062C2D0C',
      },
      version: 'v1',
    },
    rarible: {
      api_url: 'https://ethereum-api-staging.rarible.org/v0.1',
      erc20_transfer_proxy: '0x2fce8435f0455edc702199741411dbcd1b7606ca',
      nft_transfer_proxy: '0x7d47126a2600E22eab9eD6CF0e515678727779A6',
      base_url: 'https://rinkeby.rarible.com',
    },
    dao_conditional_helper_addr: '0xc50462aEa8873f6343a2Fd2103aE1dD21d53bC27',
    escrow_minion: '0xEB28321b7952CC34bFb734413b58496A889C9660',
    disperse_app: '0xD152f549545093347A162Dce210e7293f1452150',
  },
};
export const chainlookup = (chainId: string, property: string): DictFieldType =>
  CHAIN[chainId][property];
