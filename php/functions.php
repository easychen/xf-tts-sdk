<?php
function text2sendjson($text)
{
    $common = ['app_id' => XF_APPID];
    $business = [];
    $business['aue'] = "raw";
    $business['auf'] = "audio/L16;rate=16000";
    $business['vcn'] = "xiaoyuan";
    $business['tte'] = "UTF8";

    $data['text'] = base64_encode($text);
    $data['status'] = 2;


    $send_data = ['common' => $common, 'business' => $business, 'data' => $data];
    return  json_encode($send_data);
}

function get_xf_wss_info($url = '/v2/tts', $host = 'tts-api.xfyun.cn', $port = 80)
{
    $date = gmdate('D, d M Y H:i:s') . ' GMT';

    $request_line = "GET $url HTTP/1.1";
    $signature_origin = "host: $host\ndate: $date\n" . $request_line;
    $signature_sha = hash_hmac('sha256', $signature_origin, XF_SKEY, true);

    $signature = base64_encode($signature_sha);


    $authorization_origin = 'api_key="' . XF_AKEY . '",algorithm="hmac-sha256",headers="host date request-line",signature="' . $signature . '"';


    $authorization = base64_encode($authorization_origin);

    $path = $url . '?authorization=' . urlencode($authorization) . '&host=' . urlencode($host) . '&date=' . urlencode($date);

    $final_url = 'ws://' . $host . ':' . $port . $path;

    return ['url' => $final_url, 'path' => $path, 'host' => $host, 'port' => $port];
}
