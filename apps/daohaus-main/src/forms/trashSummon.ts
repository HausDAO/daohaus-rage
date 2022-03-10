import { TrashForm } from '../types/trashFormTypes';

export const TRASH_SUMMON: TrashForm = {
  items: [
    { type: 'input', label: 'DAO Name', id: 'daoName' },
    { type: 'input', label: 'Share Token Name', id: 'tokenName' },
    { type: 'input', label: 'Share Token Symbol', id: 'tokenSymbol' },
    { type: 'input', label: 'Voting Period (in seconds)', id: 'votingPeriod' },
    { type: 'input', label: 'Grace Period (in seconds)', id: 'gracePeriod' },
    { type: 'input', label: 'Proposal Offering', id: 'newOffering' },
    { type: 'input', label: 'Quorum (%)', id: 'quorum' },
    {
      type: 'input',
      label: 'Self Sponsor Threshold (amt of shares)',
      id: 'sponsorThreshold',
    },
    {
      type: 'input',
      label: 'Minimum Retention (whatever that means)',
      id: 'minRetention',
    },
    // SHAMAN CONFIG
    {
      type: 'input',
      label: 'Shaman Addresses (address[])',
      id: 'shamanAddresses',
    },
    {
      type: 'input',
      label: 'Shaman Permissions (uint[])',
      id: 'shamanPermissions',
    },
    {
      type: 'input',
      label: 'Share Addresses (address[])',
      id: 'shareAddresses',
    },
    {
      type: 'input',
      label: 'Share Amounts (address[])',
      id: 'shareAmounts',
    },
    {
      type: 'input',
      label: 'Loot Addresses (address[])',
      id: 'lootAddresses',
    },
    {
      type: 'input',
      label: 'Loot Amounts (address[])',
      id: 'lootAmounts',
    },
    { type: 'checkBox', label: 'Pause Loot', id: 'pauseLoot' },
    { type: 'checkBox', label: 'Pause Shares', id: 'pauseShares' },
  ],
};
