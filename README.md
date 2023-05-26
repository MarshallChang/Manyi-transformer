# A tool for glb/gltf compression

# Build on Electron,Electron React Boilerplate,React,glTF-transfrom

## Sharp Error

> This project can be run well on dev mode and because of sharp need run on node env and I'm figuring it out. so if you want to run this project, please follow these steps. If you have experience in solving this issue, please reach out to me. I would greatly appreciate it.

1. remove `"sharp": "^0.32.1"` in `release/app/package.json`
2. run `npm install` on root path
3. go to `release/app` and run `npm install sharp --save`
4. go to root path and run `npm install sharp --save`
5. `npm run start`
