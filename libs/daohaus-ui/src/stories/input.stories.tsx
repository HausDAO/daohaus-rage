import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from '../components/GenericInput';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const InputAtom: ComponentStory<typeof Input> = (props) => (
  <Input placeholder="test" {...props} />
);
InputAtom.storyName = 'Input (No Wrapper)';
