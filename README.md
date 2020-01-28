ParcelJS plugin to force load order for [glob assets](https://en.parceljs.org/module_resolution.html#glob-file-paths).

:warning: This works with parcel-bundler 1.x (`npm i parcel-bundler` and not `npm i parcel`). 

Parcel uses "fastglob" to handle glob assets.  [fastglob](https://github.com/mrmlnc/fast-glob) results are returned in arbitrary order. 

This plugin forces alphabetical sort order of resolved glob assets using Javascript's `sort()`.

### Why
For use in legacy applications that rely on a folder-structure load order.
 
### Install
```
npm install --D parcel-plugin-glob-ordered
```
Parcel will automatically load all such plugins in your package.json.

### Running
```js
PARCEL_WORKERS=1 parcel entry.html
```
It's important to keep worker farm to a single instance so that dependencies are kept in sync.

### Caveats
The plugin monkey patches Parcel internals It might just break in an upcoming version.

Tested with parcel-bundler 1.12.4.

### License

MIT
