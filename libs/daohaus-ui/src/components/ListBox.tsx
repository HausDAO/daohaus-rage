import { FunctionComponent } from 'react';

import { Field } from '../types/trashFormTypes';

import GenericTextArea from './GenericTextArea';

const ListBox: FunctionComponent<Field> = (props) => {
  return <GenericTextArea {...props} />;
};

export default ListBox;
