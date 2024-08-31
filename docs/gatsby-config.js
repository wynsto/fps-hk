/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "/fps-hk",
  siteMetadata: {
    title: `Faster Payment System QR Code Generator`,
    siteUrl: `https://wynsto.github.io/fps-hk/`
  },
  plugins: [{ 
    resolve: "gatsby-plugin-google-gtag",
    options: {
      "trackingIds": ["G-6PL8YL3GV4"]
    }
  }, "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-transformer-remark", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};