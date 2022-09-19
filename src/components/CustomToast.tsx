import { AntDesign } from '@expo/vector-icons';
import { useAppSelector } from '@src/store';
import { Box, Text, View, useToast } from 'native-base';
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
    toast.closeAll();
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
            alignItems="center"
            flexDirection="row"
            minW="60%"
          >
            <AntDesign
              name={
                toastState.variant === 'success'
                  ? 'checkcircle'
                  : ['warning', 'error'].includes(toastState?.variant || '')
                  ? 'warning'
                  : 'infocirlce'
              }
              size={30}
              color="white"
            />
            <View mx={4} py={2}>
              <Text color="white" fontSize="md">
                {toastState?.title || 'Success'}
              </Text>
              {toastState?.message && (
                <Text color="white">{toastState.message}</Text>
              )}
            </View>
          </Box>
        );
      },
    });
  }, [toastState]);

  return <></>;
};

export default CustomToast;
