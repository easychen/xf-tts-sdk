<?php
define( "XF_APPID" , "5d948d69"  );
define( "XF_SKEY" , "0c2ef87927af42270793ea3ad3c3d97e"  );
define( "XF_AKEY" , "29bf437e6b9dcb28b0fad652596e6fa7"  );

require_once 'functions.php';
require_once 'websocket_client.php';

$info = get_xf_wss_info();

$client = new WebSocketClient( $info['host'] , 80 , $info['path'
] );

$client->connect();

$client->send( text2sendjson("测试音频") );

$file = "append.pcm";

sleep(5);

$data = $client->recv();

if( strlen( $data ) > 1000 )
{
    // websocket_client 或者 swoole 实现有问题，返回数据多了几个字节
    // 导致 decode 不能成功
    $data_array = json_decode( $data );
    print_r( $data_array );
    //file_put_contents( $file , $data );
}
else
{
    echo $data;
}
