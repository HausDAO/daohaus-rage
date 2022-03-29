// Button.stories.ts|tsx

import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from '../components/Button';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Button',
  component: Button,
} as ComponentMeta<typeof Button>;

//👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof Button> = () => <Button />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});

// Primary.args = {
//   primary: true,
//   label: 'Button',
// };

// Secondary.args = {
//   secondary: true,
//   label: 'Button',
// };

//args match props
