import resolve from "@rollup/plugin-node-resolve"; //Uses the node resolution algorithm for modules
import commonjs from "@rollup/plugin-commonjs"; //Converts commonjs modules to ES6 modules
import typescript from "@rollup/plugin-typescript"; //Teaches rollup how to process Typescript files
import dts from "rollup-plugin-dts"; //rollup your .d.ts files
import postcss from "rollup-plugin-postcss";
import fs from "fs-extra";
import path from "path";
import hasha from "hasha";
import url from "postcss-url";
import image from '@rollup/plugin-image';
import json from "@rollup/plugin-json";

const packageJson = require( "./package.json" );
const IMAGES_RX = /\.(png|jpe?g|gif|webp|svg|svg#[A-Za-z]+|eot|ttf|woff)$/;
const OUT_DIR = "dist";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                format: "cjs",
                sourcemap: false,
            },
            {
                file: packageJson.module,
                format: "esm",
                sourcemap: false,
            },
            {
                file: packageJson.umd,
                format: "umd",
                sourcemap: false,
                name: "TRFSiteBuilder",
                globals: {
                    'react': 'React',
                    'react-dom': 'ReactDOM',
                }
            }
        ],
        plugins: [
            image(),
            resolve( {jsnext: true, preferBuiltins: true, browser: true} ),
            json(),
            commonjs( {
                requireReturnsDefault: ( id ) => {
                    if ( id.indexOf( "styled-components" ) !== -1 ) {
                        return "auto";
                    }
                    return "false";
                }
            } ),
            typescript( {
                tsconfig: "./tsconfig.json",
                exclude: ["**/__tests__", "**/*.test.ts", "**/*.test.tsx"],
            } ),
            postcss( {
                extract: true,
                plugins: [
                    url( {
                        url: ( asset ) => {
                            const filename = asset.url.split( "?" );
                            console.log( "File: ", filename );
                            if ( !IMAGES_RX.test( filename[0] ) ) return asset.url;

                            const file = fs.readFileSync( asset.absolutePath );
                            const hash = hasha( file, {algorithm: "md5"} );

                            const extname = path.extname( asset.absolutePath );

                            const hashedFileName = `${hash}${extname}`;
                            fs.ensureDirSync( path.join( OUT_DIR, "_assets" ) );
                            const hashedFilePath = path.join(
                                "_assets",
                                hashedFileName
                            );

                            fs.writeFileSync(
                                path.join( OUT_DIR, hashedFilePath ),
                                file
                            );

                            return "../" + hashedFilePath + "?" + filename[1];
                        },
                    } ),
                ],
            } )
        ],
        external: ["react", "react-dom"],
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{file: "dist/index.d.ts", format: "esm"}],
        plugins: [dts()],
        external: [/\.(css|less|scss)$/, "react", "react-dom"],
    },
];
