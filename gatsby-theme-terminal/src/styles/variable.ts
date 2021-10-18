export const useColors = (themeColor = '#8c3a00') => ({
  ...immutableColors,
  themeColor: themeColor,
});

export const immutableColors = {
  backgroundColor: '#181a1b',
  fontColor: '#E8E6E3',
};

export const color = {
  bgColor: '#181a1b',
  textColor: '#E8E6E3',
  headerColor: '#8c3a00',
  post: {
    titleColor: '#ffa460',
    borderColor: '#933d00',
    metaColor: '#ffa464b3',
    mark: {
      bgColor: '#8c3a00',
      textColor: '#d1cdc7',
    },
    code: {
      bgColor: '#8c3a0033',
      textColor: '#ffa464',
    },
    img: {
      bgColor: '#8c3a00',
      textColor: '#d1cdc7',
    },
  },
};
