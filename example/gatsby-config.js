module.exports = {
  siteMetadata: {
    title: 'Terminal', // The name of the site
    themeColor: '#8c3a00', // The theme color of the website, default '#8c3a00'
    year: 2017, // When did you start writing articles? (year)
    menu: [
      // The structure of the main menu
      // Pay attention to the order
      {
        title: 'About', // Name of the menu
        path: '/about', // URL of the menu
      },
      {
        title: 'Tags',
        path: '/tags',
      },
    ],
  },
  plugins: [
    {
      // Read files from content/posts
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts`,
      },
    },
    { resolve: `gatsby-theme-terminal`, options: {} },
  ],
};
