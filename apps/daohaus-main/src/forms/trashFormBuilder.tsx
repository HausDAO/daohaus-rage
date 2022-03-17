import { FunctionComponent, useEffect } from 'react';
// import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { useWallet } from '@raidguild/quiver';
import { providers } from 'ethers';

import { Field, TrashForm } from '../types/trashFormTypes';
import { handleSummonArgs, summon, SummonFormData } from '../utils/summon';
import { ArgType } from '../types/contract';
import { isArgType } from '../utils/abi';

// import * from '@daohaus-monorepo/daohaus-ui';

import {
  Button,
  FormContainer,
  GenericCheckBox,
  GenericInput,
  GenericTextArea,
  ListBox,
} from '@daohaus-monorepo/daohaus-ui';

// SAGE, stricter typechecking

const TrashFormBuilder: FunctionComponent<{ form: TrashForm }> = (props) => {
  const { form } = props;
  const { log, items } = form;
  const formMethods = useForm();
  const { watch, handleSubmit } = formMethods;
  const formValues = watch();
  const { provider } = useWallet();

  const onSubmit = async (formValues: { [indes: string]: unknown }) => {
    const summonArgs = handleSummonArgs(formValues as SummonFormData);
    const errors = summonArgs.filter((arg) => !isArgType(arg));
    if (!provider) return;
    console.log('provider', provider);
    if (errors) {
      errors.forEach((error) => console.error(error));
    }
    await summon(provider as providers.Web3Provider, summonArgs as ArgType[]);
  };

  useEffect(() => {
    formValues && log && console.log(formValues);
  }, [log, formValues]);

  return (
    <FormProvider {...formMethods}>
      <FormContainer>
        {items.map((field: Field) => (
          <FieldFactory {...field} key={field.id} />
        ))}
        <Button onClick={handleSubmit(onSubmit)} type="submit">
          {form.submitText || 'Submit Form'}
        </Button>
      </FormContainer>
    </FormProvider>
  );
};

export default TrashFormBuilder;

const FieldFactory: FunctionComponent<Field> = (props) => {
  const { type } = props;
  if (type === 'input') {
    return <GenericInput {...props} />;
  }
  if (type === 'textarea') {
    return <GenericTextArea {...props} />;
  }
  if (type === 'checkBox') {
    return <GenericCheckBox {...props} />;
  }
  if (type === 'listBox') {
    return <ListBox {...props} />;
  }
  return null;
};

// const FormContainer = styled.div`
//   margin-top: 4rem;
//   max-width: 30rem;
//   form {
//     width: 100%;
//   }
//   .input-wrapper {
//     margin-bottom: 2rem;
//     width: 100%;
//     input,
//     textarea,
//     label {
//       width: 100%;
//     }
//   }
// `;

// const InputWrapper: FunctionComponent<Field> = ({ children, id, label }) => {
//   return (
//     <div className="input-wrapper">
//       <Label htmlFor={id}>{label}</Label>
//       <div>{children}</div>
//     </div>
//   );
// };

// const GenericInput: FunctionComponent<Field> = (props) => {
//   const { id } = props;
//   const { register } = useFormContext();
//   return (
//     <InputWrapper {...props}>
//       <input id={id} {...register(id)} />
//     </InputWrapper>
//   );
// };
// const GenericTextArea: FunctionComponent<Field> = (props) => {
//   const { id } = props;
//   const { register } = useFormContext();
//   return (
//     <InputWrapper {...props}>
//       <textarea id={id} rows={5} {...register(id)} />
//     </InputWrapper>
//   );
// };
// const GenericCheckBox: FunctionComponent<Field> = (props) => {
//   const { id } = props;
//   const { register } = useFormContext();

//   return (
//     <InputWrapper {...props}>
//       <input
//         id={id}
//         type="checkbox"
//         {...register(id)}
//         name={id}
//         defaultChecked={true}
//       />
//     </InputWrapper>
//   );
// };
// const ListBox: FunctionComponent<Field> = (props) => {
//   return <GenericTextArea {...props} />;
// };
