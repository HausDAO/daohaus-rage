module.exports.config = {
  mainnet: {
    dataSources: [],
    templates: []
  },
  "arbitrum-one": {
    dataSources: [],
    templates: []
  },
  celo: {
    dataSources: [],
    templates: []
  },
  kovan: {
    dataSources: [],
    templates: []
  },
  xdai: {
    dataSources: [],
    templates: []
  },
  rinkeby: {
    dataSources: [
      {
        name: "baalSummoner",
        template: "baal-summoner-ds.yaml",
        address: "0x31C948A5Ad149853B211de025082b61573ef3979",
        startBlock: 10305239
      }
    ],
    templates: [
      {
        name: "baalTemplate",
        template: "baal-template.yaml"
      }
    ]
  },
  matic: {
    dataSources: [],
    templates: []
  }
};
