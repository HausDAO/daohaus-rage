import { TrashForm } from '../types/trashFormTypes';

export const TRASH_SUMMON: TrashForm = {
  items: [
    { type: 'input', label: 'Share Token Name', id: 'tokenName' },
    { type: 'input', label: 'Share Token Symbol', id: 'tokenSymbol' },
    { type: 'input', label: 'Share Token Symbol', id: 'tokenSymbol' },
    { type: 'checkBox', label: 'Pause Shares', id: 'pauseShares' },
    { type: 'checkBox', label: 'Pause Loot', id: 'pauseLoot' },
  ],
};
