import React from 'react';
import {useFormikContext} from 'formik';

import AppButton from './AppButton';

function SubmitButton({title}) {
  const {handleSubmit} = useFormikContext();

  return (
    <AppButton
      title={title}
      textcolor="white"
      color="primaryBlue"
      borderColor="#1645f5"
      onPress={handleSubmit}
    />
  );
}

export default SubmitButton;
