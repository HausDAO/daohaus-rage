import { ComponentStory, ComponentMeta } from '@storybook/react';
import { BsSearch } from 'react-icons/bs';
import { Input } from '../components/GenericInput';

export default {
  title: 'Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const InputAtom: ComponentStory<typeof Input> = (args) => (
  <Input {...args} className="long" />
);

InputAtom.storyName = 'Input (No Wrapper)';
InputAtom.args = {
  placeholder: 'Placeholder',
};
export const InputWithIcon: ComponentStory<typeof Input> = (args) => (
  <Input {...args} icon={BsSearch} placeholder="With Icon" />
);
InputWithIcon.storyName = 'Input (With Icon)';
