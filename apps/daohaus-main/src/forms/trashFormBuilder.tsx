import { FunctionComponent } from 'react';
import { Field } from '../types/trashFormTypes';

const TrashFormBuilder: FunctionComponent = () => {
  return <div>TrashFormBuilder</div>;
};

export default TrashFormBuilder;

const FieldFactory = (field: Field) => {
  const { type } = field;
  if (type === 'input') {
    <GenericInput fieldProps={field} />;
  }
};

const GenericInput = ({ fieldProps }) => {
  return <input />;
};
