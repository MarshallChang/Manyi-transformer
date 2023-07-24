<p align="center">
  <img src="/assets/icons/1024x1024.png" alt="Logo" width="200" />
</p>

# Manyi-transformer

[![License](https://img.shields.io/badge/License-MIT-blue)](#license)
![GitHub package.json version](https://img.shields.io/github/package-json/v/MarshallChang/Manyi-transformer)
![GitHub All Releases](https://img.shields.io/github/downloads/MarshallChang/Manyi-transformer/total)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Introduction

Manyi-transformer is a multi-platform model compression client based on Electron, React, gltf-transform, and sharp. It provides a graphical interface for users to easily compress individual glTF/GLB model files and perform batch compression.

<p align="center">
  <img src="https://s2.loli.net/2023/07/21/5tICRekTg4mAhaK.gif" alt="demo" width="1000" />
</p>

### Key Features

- Support compression of single glTF/GLB model files.
- Support batch compression of multiple glTF/GLB model files.
- Provides multi-platform support, running on Windows, macOS, and Linux.
- Utilizes the gltf-transform library for geometry and texture optimization of models.
- Uses sharp library for image compression and scaling.

## Installation

Before using, please make sure you have installed [Node.js](https://nodejs.org/).

1. Clone the repository to your local machine:

```bash
git clone https://github.com/MarshallChang/Manyi-transformer.git
```

2. Change into the project directory:

```bash
cd Manyi-transformer
```

3. Install dependencies:

```bash
npm i
```

## Runing

Use the following command to start the development mode:

```bash
npm run start
```

## Packaging

Use the following command to build the executable file

```bash
npm run package
```

After building, the executable files will be available in the `release/build` folder.

## Contribution

If you find any bugs or have any suggestions, please contribute your code via Issue or Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
