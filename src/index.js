const { isGlob } = parseInt(process.versions.node, 10) < 8
  ? require('parcel-bundler/lib/utils/glob')
  : require('parcel-bundler/src/utils/glob');

// Override Parser#findParser method
const Parser = require('parcel-bundler/src/Parser');
const origFindParser = Parser.prototype.findParser;
Parser.prototype.findParser = _findParser;

const GlobOrderedAsset = require('./GlobOrderedAsset');

module.exports = bundler => {
  // bundlers parser has already been instantiated before this module is loaded.
  // So proxy the findParser method on the instance.
  bundler.parser = new Proxy(bundler.parser, {
    get(target, key) {
      if (key === 'findParser') {
        return _findParser;
      }
      return target[key];
    }
  });
};

function _findParser(filename, fromPipeline) {
  if (!fromPipeline && isGlob(filename)) {
    return GlobOrderedAsset;
  }

  return origFindParser.apply(this, arguments);
}