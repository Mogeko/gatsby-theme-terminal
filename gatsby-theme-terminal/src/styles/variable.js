export const useColors = (themeColor = '#8c3a00') => ({
  ...immutableColors,
  themeColor: themeColor,
});

export const immutableColors = {
  backgroundColor: '#181a1b',
  fontColor: '#E8E6E3',
};

export const color = {
  backgroundColor: '#181a1b',
  fontColor: '#E8E6E3',
  headerColor: '#8c3a00',
  post: {
    titleColor: '#ffa460',
    headerDividerColor: '#922d00',
    metaColor: '#ffa464b3',
  },
};
