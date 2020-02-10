const sortKeys = require('sort-keys-with-context');
const isPlainObject = require('is-plain-obj');

const logger = require('@parcel/logger');

const GlobAsset = parseInt(process.versions.node, 10) < 8
  ? require('parcel-bundler/lib/assets/GlobAsset')
  : require('parcel-bundler/src/assets/GlobAsset');

class GlobOrderedAsset extends GlobAsset {
  async pretransform() {
    logger.log('Sorting glob asset: ' + this.name);

    this.contents = sortKeys(this.contents, {
      deep: true,
      compare: breadthFirstComparator
    });
  }
}

// nested objected are sorted last -- mimics breadth-first search
const breadthFirstComparator = function(left, right) {
  let lobj = isPlainObject(this[left]);
  let robj = isPlainObject(this[right]);

  // if both sides ARE or ARE NOT obj, just compare keys
  if (lobj === robj) {
    return left.localeCompare(right);
  }
  return lobj ? 1 : -1;
};


module.exports = GlobOrderedAsset;
