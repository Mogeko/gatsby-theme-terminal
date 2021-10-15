module.exports = {
  siteMetadata: {
    title: 'Terminal',
    themeColor: '#8c3a00',
    year: 2017,
    menu: [
      {
        title: 'About',
        path: '/about',
      },
      {
        title: 'Tags',
        path: '/tags',
      },
    ],
  },
  plugins: [{ resolve: `gatsby-theme-terminal`, options: {} }],
};
