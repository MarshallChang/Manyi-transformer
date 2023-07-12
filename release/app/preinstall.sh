#!/usr/bin/env bash

set -e

# electron版本
electron="23.0.0"

# 使用原生node模块的方式
# 1 为Electron手动编译sharp，
# 2 还有一种更简单的方式：electron-rebuild
# https://electronjs.org/docs/tutorial/using-native-node-modules#%E4%B8%BA-electron-%E5%AE%89%E8%A3%85%E5%B9%B6%E9%87%8D%E6%96%B0%E7%BC%96%E8%AF%91%E6%A8%A1%E5%9D%97
sharp=false

# 淘宝npm源
# registry="https://registry.npm.taobao.org"
# 淘宝镜像仓库 https://npm.taobao.org/mirrors/

# 打印debug信息，查看是否换源成功
export DEBUG="*"

# 是不是本地开发,NO_LOCAL在git action里设置的这个环境变量
# -z 检查变量是否为空，如果是空的就认为是在本地开发
if [[ -z $NO_LOCAL ]]; then
  # 设置环境变量

  # 换源安装electron#7.1.2
  # 加速国内下载速度 https://blog.tomyail.com/install-electron-slow-in-china/
  # export ELECTRON_MIRROR="https://registry.npmmirror.com/electron/"
  # export ELECTRON_CUSTOM_DIR=${electron}

  # 换源安装sharp
  # export SHARP_DIST_BASE_URL="https://registry.npmmirror.com/sharp-libvips/v8.8.1/"

  # npm i electron@${electron} -D -E

  npm i --platform=darwin --arch=x64 sharp@0.32.2 -E
fi

if [[ ${sharp} == true ]]; then

  # 使用node-gyp需要python的支持
  if [[ $(command -v python) ]]; then
    echo 'python 已经安装...'
    echo "安装的python版本为：$(python --version)"
    printf "\n"
  else
    echo '需要安装python...'
  fi

  # node-gyp 工具重新编译sharp，以适应当前版本electron
  # https://electronjs.org/docs/tutorial/using-native-node-modules#%E4%B8%BA-electron-%E6%89%8B%E5%8A%A8%E7%BC%96%E8%AF%91
  npm i node-gyp -D -E

  echo "重新编译sharp"
  cd node_modules/sharp
  echo "切换到sharp目录下: $(pwd)"
  echo "npx node-gyp rebuild --target=${electron} --arch=x64 --dist-url=https://electronjs.org/headers"
  npx node-gyp rebuild --target=${electron} --arch=x64 --dist-url=https://electronjs.org/headers
fi
