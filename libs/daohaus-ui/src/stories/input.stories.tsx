import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BsSearch } from 'react-icons/bs';
import { Input } from '../components/GenericInput';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const InputAtom: ComponentStory<typeof Input> = (args) => (
  <Input {...args} />
);

InputAtom.storyName = 'Input (No Wrapper)';
InputAtom.args = {
  placeholder: 'placeholder',
};
export const InputWithIcon: ComponentStory<typeof Input> = (args) => (
  <Input {...args} icon={BsSearch} placeholder="With Icon" />
);
InputWithIcon.storyName = 'Input (With Icon)';
