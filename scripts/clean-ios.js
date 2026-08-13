#!/usr/bin/env node
/**
 * 清理 iOS 构建缓存
 *
 * 背景:Swift/Clang 的预编译模块缓存(.pcm)会硬编码项目的绝对路径。
 * 当项目目录被物理移动/改名后,这些缓存的路径校验会失败,导致
 * `xcodebuild error 65` / `missing required module 'SwiftShims'`。
 *
 * 本脚本删除两处会硬编码路径的缓存,清完后重新编译即可,无需重装 pod:
 *   1. node_modules/expo-modules-jsi/apple/.DerivedData(该模块自建 xcframework,内嵌独立缓存)
 *   2. ~/Library/Developer/Xcode/DerivedData/rnplayground-*(Xcode 项目级缓存)
 */
const fs = require('fs')
const os = require('os')
const path = require('path')

function rm(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true })
    console.log(`  ✔ 已删除 ${target}`)
    return true
  }
  console.log(`  - 跳过(不存在) ${target}`)
  return false
}

console.log('清理 iOS 构建缓存...')

// 1. expo-modules-jsi 内嵌的 DerivedData
rm(path.join(process.cwd(), 'node_modules/expo-modules-jsi/apple/.DerivedData'))

// 2. Xcode 项目级 DerivedData(前缀匹配)
const derivedData = path.join(
  os.homedir(),
  'Library/Developer/Xcode/DerivedData',
)
if (fs.existsSync(derivedData)) {
  fs.readdirSync(derivedData)
    .filter((name) => name.startsWith('rnplayground-'))
    .forEach((name) => rm(path.join(derivedData, name)))
} else {
  console.log(`  - 跳过(不存在) ${derivedData}`)
}

console.log('iOS 构建缓存清理完成。')
