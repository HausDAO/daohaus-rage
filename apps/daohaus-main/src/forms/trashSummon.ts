import { TrashForm } from '../types/trashFormTypes';

export const TRASH_SUMMON: TrashForm = {
  submitText: 'Summon Baal',
  log: true,
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
      type: 'textarea',
      label: 'Shaman Addresses (address[])',
      id: 'shamanAddresses',
    },
    {
      type: 'textarea',
      label: 'Shaman Permissions (uint[])',
      id: 'shamanPermissions',
    },
    {
      type: 'textarea',
      label: 'Share Addresses (address[])',
      id: 'shareAddresses',
    },
    {
      type: 'textarea',
      label: 'Share Amounts (uint[])',
      id: 'shareAmounts',
    },
    {
      type: 'textarea',
      label: 'Loot Addresses (address[])',
      id: 'lootAddresses',
    },
    {
      type: 'textarea',
      label: 'Loot Amounts (uint[])',
      id: 'lootAmounts',
    },
    { type: 'checkBox', label: 'Pause Loot', id: 'pauseLoot' },
    { type: 'checkBox', label: 'Pause Shares', id: 'pauseShares' },
  ],
};
