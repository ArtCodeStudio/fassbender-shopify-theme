// export * from '../../node_modules/tinybind/src/index'; // error on tsc with linked package (duplicated jquery definitions)
// export * from 'tinybind'; // error on webpack / babel-loader with linked packages (can't import the source files)

// just a copy of the source files seems to work on both tsc and webpack
export * from '../modules/tinybind/index';
