## Template for a Spring + React + WebAssembly project

This template was made as  a basis for our EasyPass project.

## Usage

`gradle wasmBuild`: Build WebAssembly 

           Note: Rust needs to be installed locally including `wasm-pack`

`gradle appInstall`: Install React dependencies via NPM

`gradle appBuild`: Build React App

`gradle appCopy`: Copy the build output of the React App to Spring resources folder

`gradle build`: Build Spring Project

