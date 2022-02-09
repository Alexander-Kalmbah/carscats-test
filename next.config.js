module.exports = {
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },

  env: {
    MONGO_HOST: '127.0.0.1',
    MONGO_PORT: ':27017',
    MONGO_NAME: '/test'
  }
}
