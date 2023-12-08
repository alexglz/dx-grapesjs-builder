const path = require('path');

module.exports = ({ config }) => {

  config.module.rules = config.module.rules.map( data => {
    // This overrides default svg rouls of storybook, and after that we can use
   //svg-inline-loader.
    if (/svg\|/.test( String( data.test ) ))
      data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani) (\?.*)?$/;
    return data;
  });

    config.module.rules.push({
        test: /\.scss|.css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      });
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('awesome-typescript-loader'),
        },
      ],
    });
    config.module.rules.push({
      test: /\.svg$/,
      include: path.resolve(__dirname, '../'),
      loader: 'svg-inline-loader'
    });

    config.resolve.extensions.push('.ts', '.tsx')
    return config;
};