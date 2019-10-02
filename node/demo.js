const app_id = '5d948d69';
const app_skey = '0c2ef87927af42270793ea3ad3c3d97e';
const app_akey = '29bf437e6b9dcb28b0fad652596e6fa7';


const info = get_wss_info();
let WebSocketClient = require('websocket').client;
let client = new WebSocketClient();
var fs = require("fs");
let count = 1;

if( fs.existsSync( "append.pcm" ) )
fs.unlinkSync( "append.pcm" );

client.on( 'connect' , ( con ) => 
{
    console.log("connect");
    
    con.on( 'error' , error => 
    {
        console.log('Error: ' + error.toString());
    } );

    con.on(  'close' , ()=> {
        console.log(  "connecttion closed" );
    } )

    con.on( 'message' , message =>
    {
        if( message.type == 'utf8' )
        {
            const ret = JSON.parse( message.utf8Data );
            // fs.appendFileSync( "a.txt" , ret.data.audio );
            fs.appendFileSync( "append.pcm" ,  Buffer.from(ret.data.audio , 'base64' ) );

            if( ret.data.status == 2 )
            {
                console.log("finished");
                // console.log( client );
            }
            //console.log( "data:audio/wav;base64,"+ret.data.audio )
            // ret.data.audio = "hide";
            //const bin = new Buffer(ret.data.audio , 'base64' );

            //fs.writeFileSync( "a"+ count +".txt" , ret.data.audio );
            //count++;

        }
        //console.log( message );
    } );

    if( con.connected )
    {
        const thejson = text2json( "我察终于弄出来了" );
        console.log( thejson );
        con.sendUTF( thejson );
    }

});

client.on( 'connectFailed' , error =>
{
    console.log('Connect Error: ' + error.toString());
});


//console.log( info );

client.connect( info.url );

function btoa( text )
{
    return Buffer.from(text , 'utf8' ).toString('base64');
}

function text2json( text )
{
    const common = { "app_id":app_id };

    let business ={};
    business.aue = "raw";
    business.auf = "audio/L16;rate=16000";
    business.vcn = "xiaoyan";
    business.tte = "UTF8";
    business.speed = 50;


    const data = { "text":btoa(text) , "status":2  };

    
    return JSON.stringify( {common,business,data} );
}

function get_wss_info( path = '/v2/tts' , host = 'tts-api.xfyun.cn' ){
    const date = new Date( Date.now() ).toUTCString();
    const request_line = `GET ${path} HTTP/1.1`;

    const signature_origin = `host: ${host}\ndate: ${date}\n${request_line}`;

    let crypto = require('crypto');
    

    const signature = crypto.createHmac('SHA256', app_skey ).update( signature_origin ).digest('base64');

    const authorization_origin = `api_key="${app_akey}",algorithm="hmac-sha256",headers="host date request-line",signature="${signature}"`;
    const authorization = btoa( authorization_origin );

    const thepath = `${path}?authorization=${encodeURIComponent(authorization)}&host=${encodeURIComponent(host)}&date=${encodeURIComponent(date)}`;

    const final_url = `wss://${host}${thepath}`;

    return {'url' : final_url , 'host':host , 'path':thepath};
    console.log( thepath );
}