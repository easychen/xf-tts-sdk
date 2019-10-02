# 讯飞 TTS 流式接口非官方 SDK 和 Demo

## 说明

讯飞的新TTS接口采用了 websocket 协议。新协议其实比较简单，就是添加了一个鉴权算法来生成 ws 的连接URL。另外约定了发送数据的JSON格式。

官方文档地址：https://www.xfyun.cn/doc/tts/online_tts/API.html

这里分别给出 PHP 和 Node 下计算连接用URL的函数和发送消息的包装函数。以及相应的Demo。


## PHP 版

见 php/demo.php

- get_xf_wss_info 
- text2sendjson

## Nodejs 版

见 node/demo.js 

- btoa
- get_wss_info
- text2json

