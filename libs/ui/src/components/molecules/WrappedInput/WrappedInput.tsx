import { useFormContext } from 'react-hook-form';
import { Field } from '../../../types/formAndField';
import { Input } from '../../atoms';
import { FieldWrapper } from '../FieldWrapper/FieldWrapper';

export const WrappedInput = (props: Field) => {
  const { id } = props;
  const { register } = useFormContext();
  return (
    <FieldWrapper {...props}>
      <Input {...register(id)} {...props} />
    </FieldWrapper>
  );
};
