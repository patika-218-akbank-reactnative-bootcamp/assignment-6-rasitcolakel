import { FormControl, WarningOutlineIcon } from 'native-base';
import React from 'react';
import { FieldError } from 'react-hook-form';

type CustomFormControlProps = {
  label?: string;
  error?: FieldError | undefined;
  children: React.ReactNode;
};
const CustomFormControl = ({
  children,
  error,
  label,
}: CustomFormControlProps) => {
  return (
    <FormControl isInvalid={!!error} w="100%" mb={2}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      {children}
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {error?.message}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

export default CustomFormControl;
