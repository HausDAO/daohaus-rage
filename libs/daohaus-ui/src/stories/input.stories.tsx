import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StyledInput } from '../components/GenericInput';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Input (No Wrapper)',
  component: StyledInput,
} as ComponentMeta<typeof StyledInput>;

export const InputAtom: ComponentStory<typeof StyledInput> = () => (
  <StyledInput />
);
InputAtom.storyName = 'Input (No Wrapper)';
