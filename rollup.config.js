import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
    // Build pour CommonJS (Node.js)
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.js',
            format: 'cjs',
            exports: 'named'
        },
        plugins: [
            typescript({
                declaration: true,
                declarationDir: 'dist',
                rootDir: 'src'
            })
        ]
    },
    // Build pour ES Modules (React, bundlers modernes)
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.esm.js',
            format: 'esm'
        },
        plugins: [
            typescript({
                declaration: false
            })
        ]
    },
    // Build pour UMD (utilisation directe dans le navigateur)
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.umd.js',
            format: 'umd',
            name: 'UniqueIdGen',
            exports: 'named'
        },
        plugins: [
            typescript({
                declaration: false
            })
        ]
    },
    // Build minifié pour UMD
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/index.umd.min.js',
            format: 'umd',
            name: 'UniqueIdGen',
            exports: 'named'
        },
        plugins: [
            typescript({
                declaration: false
            }),
            terser()
        ]
    }
];