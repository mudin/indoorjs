import fabric from 'fabric-pure-browser';

import { version } from '../package.json';

console.log('fabricJS ', fabric.version || window.fabric.version);
console.log('IndoorJS ', version);

export { version };

// constants
export * from './core/index';

// geometry
export * from './geometry/index';

// map
export * from './map/index';

// floorplan
export * from './floorplan/index';

// layer
export * from './layer/index';

// Free Drawing Canvas
export * from './paint/index';
