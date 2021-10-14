import { useState } from 'react';

export const useColors = (themeColor = '#8c3a00') => ({
  ...immutableColors,
  themeColor: themeColor,
});

export const immutableColors = {
  backgroundColor: '#181a1b',
  fontColor: '#E8E6E3',
};
