import fabric from 'fabric';

import { version } from '../package.json';

console.log('fabricJS ', fabric.version);

export { version };

// geometry
export * from './geometry/index';

// map
export * from './map/index';

// floorplan
export * from './floorplan/index';

// layer
export * from './layer/index';
