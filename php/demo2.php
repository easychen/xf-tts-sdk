<?php

use Swlib\SaberGM;

Swoole\Runtime::enableCoroutine();
require __DIR__ . '/vendor/autoload.php';

define("XF_APPID", "5d948d69");
define("XF_SKEY", "0c2ef87927af42270793ea3ad3c3d97e");
define("XF_AKEY", "29bf437e6b9dcb28b0fad652596e6fa7");

$info = get_xf_wss_info();
go(function () use ($info) {
    $websocket = SaberGM::websocket($info['url']);
    $websocket->push(text2sendjson("测试音频"));
    $data = $websocket->recv();
    if (strlen($data) > 1000) {
        $data_array = json_decode($data);
        print_r($data_array);
        //可以写入文件
        //file_put_contents( $file , $data );
    } else {
        echo $data;
    }
});
