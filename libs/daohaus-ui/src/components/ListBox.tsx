import { FunctionComponent } from 'react';

import { Field } from '../types/formTypes';

import GenericTextArea from './GenericTextArea';

const ListBox: FunctionComponent<Field> = (props) => {
  return <GenericTextArea {...props} />;
};

export default ListBox;
