import { useAppSelector } from '@src/store';
import { Box, Text, useToast } from 'native-base';
import React, { useEffect } from 'react';

const CustomToast = () => {
  const toast = useToast();
  const toastState = useAppSelector((state) => state.ui.toast);

  const variantColors = {
    success: 'green.500',
    error: 'red.500',
    warning: 'yellow.500',
    info: 'blue.500',
  };
  useEffect(() => {
    if (!toastState) return;
    toast.show({
      render: () => {
        return (
          <Box
            bg={
              toastState.variant
                ? variantColors[toastState.variant]
                : 'emerald.500'
            }
            px="2"
            py="1"
            rounded="sm"
          >
            <Text color="white">{toastState?.title || 'Success'}</Text>
            {toastState?.message && (
              <Text color="white">{toastState.message}</Text>
            )}
          </Box>
        );
      },
    });
  }, [toastState]);

  return <></>;
};

export default CustomToast;
