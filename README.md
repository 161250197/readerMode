# reader-mode

> 以阅读小说为例的移动端浏览器阅读模式项目

## 启动

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 说明

此项目为最基本的mock项目，仅为保证前端项目在无正式服务端支持的情况下能够正常运行

## 支持

### 服务端支持

需要 [服务端项目](https://github.com/161250197/readerModeServer) 支持

如果要修改服务端的host和port，请修改文件 [consts.js](./src/utils/consts.js)

## 功能介绍

### 阅读功能

* 上下翻页和左右翻页
* 下拉加载上一章
* 预加载下一章
* 目录跳转
* 辅助信息（章节标题，时间，电量）显示

### 自定义功能

* 阅读模式切换
* 字体大小、背景色、行间距切换
* 夜间模式

### 引流功能

* 跳转小说书城
* 小说书城推荐
* 小说广告

### 附加功能

* 书签功能
* 小说换源功能

