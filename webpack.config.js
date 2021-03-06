/** Modules */
let webpack           = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ngAnnotatePlugin  = require('ng-annotate-webpack-plugin');
let path              = require('path');
let fs = require('fs');

// let configWebpack = require('./config');
let configWebpack = JSON.parse(fs.readFileSync('config.json', 'utf8'));

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
let ENV = process.env.npm_lifecycle_event;
let isProd = ENV === 'build';
let rootPublic = path.resolve('./src');
let sassLoader = !isProd ? ['style-loader?sourceMap', `css-loader?root=${rootPublic}&sourceMap`, 'postcss-loader?sourceMap', 'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'].join('!')
  : ExtractTextPlugin.extract(['css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap']);

module.exports = (function makeWebpackConfig () {
  /**
   * Port
   * This is default port for dev server
   */
  let port = configWebpack.portDev;

  /**
   * Config
   * Reference: http://webpack.github.io/docs/configuration.html
   * This is the object where all configuration gets set
   */
  let config = {};

  /**
   * Entry
   * Reference: http://webpack.github.io/docs/configuration.html#entry
   * Should be an empty object if it's generating a test build
   * Karma will set this when it's a test build
   */
  config.entry = {
    app: './src/app/app.js'
  };

  /**
   * Output
   * Reference: http://webpack.github.io/docs/configuration.html#output
   * Should be an empty object if it's generating a test build
   * Karma will handle setting it up for you when it's a test build
   */
  config.output = {
    path: __dirname + '/dist',  /** Absolute output directory */

    /**
     * Output path from the view of the page
     * Uses webpack-dev-server in development
     */
    publicPath: isProd ? configWebpack.subDomain : 'http://localhost:' + port + '/',

    /**
     * Filename for entry points
     * Only adds hash in build mode
     */
    filename: isProd ? '[name].[hash].js' : '[name].bundle.js',

    /**
     * Filename for non-entry points
     * Only adds hash in build mode
     */
    chunkFilename: isProd ? '[name].[hash].js' : '[name].bundle.js'
  };

  /**
   * Devtool
   * Reference: http://webpack.github.io/docs/configuration.html#devtool
   * Type of sourcemap to use per build type
   */
  config.devtool = isProd ? 'source-map' : 'eval-source-map';

  /**
   * Loaders
   * Reference: http://webpack.github.io/docs/configuration.html#module-loaders
   * List: http://webpack.github.io/docs/list-of-loaders.html
   * This handles most of the magic responsible for converting modules
   */

  /** Initialize module */
  config.module = {
    preLoaders: [{
      test: /\.js$/, 
      loader: "eslint-loader", 
      exclude: [/node_modules/, /vendor/]
    }
    ],
    loaders: [
    {
      /**
       * JS LOADER
       * Reference: https://github.com/babel/babel-loader
       * Transpile .js files using babel-loader
       * Compiles ES6 and ES7 into ES5 code
       */
      test: /\.js$/,
      loaders: ['ng-annotate', 'babel?presets[]=es2015&presets[]=stage-2'],
      exclude: /node_modules/
    },
    { test: /\.json$/, loader: 'json' },
    { /** This loader config depend on line 178 */
      /**
       * CSS LOADER
       * Reference: https://github.com/webpack/css-loader
       * Allow loading css through js
       * Compiles ES6 and ES7 into ES5 code
       *
       * Reference: https://github.com/postcss/postcss-loader
       * Postprocess your css with PostCSS plugins
       */
      test: /\.(scss|css)$/,

      /**
       * CSS LOADER
       * Reference: https://github.com/webpack/extract-text-webpack-plugin
       * Extract css files in production builds
       * Modularize styles
       * Compiles ES6 and ES7 into ES5 code
       *
       * Reference: https://github.com/webpack/style-loader
       * Use style-loader in development.
       */
      loader: sassLoader
    }, {

      /**
       * ASSET LOADER
       * Reference: https://github.com/webpack/file-loader
       * Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
       * Rename the file using the asset hash
       * Pass along the updated reference to your code
       * You can add here any file extension you want to get copied to your output
       */
      test: /\.(png|jpg|jpeg|gif)$/,
      loader: 'file'
    }, {
      test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'file?name=fonts/[name].[ext]'
    },
    {

      /**
       * HTML LOADER
       * Reference: https://github.com/webpack/raw-loader
       * Allow loading html through js
       */
      test: /\.html$/,
      // loader: 'html'
      exclude: '/node_modules',
      loader: 'raw'
    }
    ]
  };

  config.eslint = {
    configFile: './.eslintrc'
  };

  /**
   * PostCSS
   * Reference: https://github.com/postcss/autoprefixer-core
   * Add vendor prefixes and other operations to your css
   */
  config.postcss = function (bundler) {
    return [
      require('postcss-strip-inline-comments'),
      require('postcss-hexrgba'),
      require('postcss-size'),
      require('precss')(),
      require('postcss-functions')({
        functions: {}
      }),
      require('css-mqpacker')(),
      require('postcss-discard-comments/dist/index')(),
      require('autoprefixer')({
        browsers: ['last 2 version']
      })
    ];
  };

  /**
   * Plugins
   * Reference: http://webpack.github.io/docs/configuration.html#plugins
   * List: http://webpack.github.io/docs/list-of-plugins.html
   */
  config.plugins = [];

    /**
   * Reference: https://github.com/ampedandwired/html-webpack-plugin
   * Render index.html
   */
  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/images/favicon.ico',
      inject: 'body'
    }),

    /**
     * Reference: https://github.com/webpack/extract-text-webpack-plugin
     * Extract css files
     * Disabled when in test mode or not in build mode
     */
    new ExtractTextPlugin('[name].[hash].css', {disable: !isProd})
  );

  /** Add build specific plugins */
  if (isProd) {
    config.plugins.push(

      /**
       * Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
       * Only emit files when there are no errors
       */
      new webpack.NoErrorsPlugin(),

      /**
       * Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
       * Dedupe modules in the output
       */
      new webpack.optimize.DedupePlugin(),

       /**
       * Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
       * Minify all javascript, switch loaders to minimizing mode
       */
      new webpack.optimize.UglifyJsPlugin(),

       /**
       * Reference: https://github.com/kevlened/copy-webpack-plugin
       * Copy assets from the public folder
       */
      new CopyWebpackPlugin([{
        from: __dirname + '/src/assets'
      }])
    );
  }
  /**
   * Dev server configuration
   * Reference: http://webpack.github.io/docs/configuration.html#devserver
   * Reference: http://webpack.github.io/docs/webpack-dev-server.html
   */
  config.devServer = {
    contentBase: './src/assets',
    stats: 'minimal',
    port: port, 
    host:'localhost'
  };

  return config;
})();