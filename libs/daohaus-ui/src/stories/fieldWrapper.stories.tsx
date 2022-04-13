import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useForm, FormProvider } from 'react-hook-form';

import GenericInput from '../components/GenericInput';
import InputWrapper from '../components/InputWrapper';

export default {
  title: 'Field Wrapper',
  component: InputWrapper,
} as ComponentMeta<typeof GenericInput>;

export const FullInput: ComponentStory<typeof GenericInput> = (args) => {
  const formMethods = useForm();
  return (
    <FormProvider {...formMethods}>
      <GenericInput {...args} />
    </FormProvider>
  );
};

FullInput.storyName = 'With Input';
FullInput.args = {
  placeholder: 'Placeholder',
  label: 'Label',
};
