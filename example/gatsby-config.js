module.exports = {
  siteMetadata: {
    title: 'Terminal',
    themeColor: '#8c3a00',
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
