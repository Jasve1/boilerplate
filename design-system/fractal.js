const path = require('path');

const fractal = module.exports = require('@frctl/fractal').create();
const pkg = require(path.join(__dirname, 'package.json'));


/*-------------------------------------------------------*\
  Feel free to adapt Fractal config below to your needs
\*-------------------------------------------------------*/

/**
 * Metadata
 */
fractal.set('project.title', 'North Design System');
// Provide the package.json "version" to the templates
fractal.set('project.version', pkg.version);

/**
 * Files location
 */
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.docs.set('path', path.join(__dirname, 'docs'));
fractal.web.set('static.path', path.join(__dirname, 'public'));

/**
 * Build options
 */
// If you change the build destination, you should adapt webpack.common.js "output.path" too.
fractal.web.set('builder.dest', 'dist');

/**
 * Templating
 */
const hbs = require("@frctl/handlebars")({
  helpers: {
    stringify: function(data) {
      return JSON.stringify(data);
    },

    // https://stackoverflow.com/a/16315366
    // Usage: {{#ifCond var1 '===' var2}}
    ifCond: function(v1, operator, v2, options) {
      switch (operator) {
        case '==':
          return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
          return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
          return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
          return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
          return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
          return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
          return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
          return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
          return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
          return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    }
  }
  /* other configuration options here */
});

fractal.components.engine(hbs);

/*----------------------------------------*\
  Change the following at your own risk
\*----------------------------------------*/

/**
 * Server configuration
 */
fractal.web.set('server.port', 4000);
fractal.web.set('server.sync', true);

/**
 * Prevent Bluebird warnings like "a promise was created in a handler but was not returned from it"
 * caused by Nunjucks from polluting the console
 */
const bluebird = require('bluebird');
bluebird.config({
  warnings: false
});
