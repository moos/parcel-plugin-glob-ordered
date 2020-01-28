const sortObject = require('deep-sort-object');
const logger = require('@parcel/logger');

const GlobAsset = parseInt(process.versions.node, 10) < 8
  ? require('parcel-bundler/lib/assets/GlobAsset')
  : require('parcel-bundler/src/assets/GlobAsset');

class GlobOrderedAsset extends GlobAsset {
  async pretransform() {
    logger.log('Sorting glob asset: ' + this.name);
    this.contents = sortObject(this.contents, GlobOrderedAsset.comparator);
  }
}
GlobOrderedAsset.comparator = null;

module.exports = GlobOrderedAsset;
