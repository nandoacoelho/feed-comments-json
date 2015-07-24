var _xssLib = require('xss');

exports.escape = function(str, options) {
    return _xssLib(str, options);
};
/**
 * Created by fernandodealmeidacoelho on 22/07/15.
 */
