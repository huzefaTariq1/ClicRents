import React from 'react';
import {useFormikContext} from 'formik';

import AppTextInput from './AppTextInput';
import ErrorMessage from './ErrorMessage';
import AppPasswordInput from './AppPasswordInput';

function AppPasswordField({name, ...otherProps}) {
  const {setFieldTouched, handleChange, errors, touched} = useFormikContext();

  return (
    <>
      <AppPasswordInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppPasswordField;
