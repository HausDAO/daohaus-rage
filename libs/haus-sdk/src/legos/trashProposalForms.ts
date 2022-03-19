import { FormCollection } from '../types/legos';

export const TRASH_PROPOSAL_FORMS: FormCollection = {
  FREE_LOAD: {
    title: 'Free Load Proposal',
    description: 'Free loot and shares!',
    submitText: 'Submit Proposal',
    items: [
      { type: 'input', label: 'Proposal Title', id: 'title' },
      { type: 'textarea', label: 'Proposal Descritption', id: 'desciption' },
      { type: 'input', label: "Free Loader's address", id: 'name' },
      { type: 'input', label: 'Shares Requested', id: 'sharesRequested' },
      { type: 'input', label: 'Loot Requested', id: 'lootRequested' },
    ],
  },
};
