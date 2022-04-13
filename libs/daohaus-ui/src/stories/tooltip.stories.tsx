import { ComponentStory, ComponentMeta } from '@storybook/react';

import Tooltip from '../components/tooltip';

export default {
  title: 'Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;

export const FullInput: ComponentStory<typeof Tooltip> = (args) => {
  return (
    <div style={{ margin: '20rem 0 0 30rem' }}>
      <Tooltip {...args} />
    </div>
  );
};

FullInput.storyName = 'Simple Tooltip (String only)';
FullInput.args = {
  content: 'This is a simple tooltip',
  side: 'right',
};
