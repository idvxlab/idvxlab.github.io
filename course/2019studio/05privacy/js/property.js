const Authority = [{
        "name": "读取设备通话状态和识别码",//0
        "text": `<tspan>读取设备通话</tspan><tspan dx="-177" dy="40">状态和识别码</tspan>`,
        "color": "#58B5A0",
        "icon": "M446.272 573.44a509.653333 509.653333 0 0 1-81.92-100.650667c67.786667-30.474667 112.138667-93.461333 112.138667-169.792C476.48 194.592 388.96 106.666667 280.906667 106.666667 170.058667 106.666667 85.333333 188.746667 85.333333 302.997333c0 158.250667 82.56 328.554667 200.618667 439.658667 100.010667 94.122667 258.986667 161.738667 413.461333 174.570667 0.832 0.074667 1.674667 0.106667 2.517334 0.106666h41.162666a30.517333 30.517333 0 0 0 0-61.045333h-39.872c-140.672-11.978667-286.026667-73.930667-375.456-158.090667-106.410667-100.16-181.408-254.837333-181.408-395.2 0-80.106667 56.981333-135.285333 134.549334-135.285333 74.282667 0 134.549333 60.533333 134.549333 135.285333 0 60.309333-40.896 107.989333-103.008 123.349334a30.517333 30.517333 0 0 0-19.786667 43.658666c27.573333 53.312 66.037333 104.426667 111.573334 147.690667 51.264 48.693333 109.941333 86.112 172.053333 108.16a30.506667 30.506667 0 0 0 40.362667-24.064c10.453333-67.093333 61.621333-114.026667 126.442666-114.026667 74.272 0 134.549333 60.544 134.549334 135.285334 0 25.578667-7.04 50.026667-20.149334 71.253333a30.528 30.528 0 0 0 51.925334 32.074667A196.096 196.096 0 0 0 938.666667 723.050667c0-108.394667-87.530667-196.330667-195.573334-196.330667-83.072 0-151.210667 52.384-177.621333 128.864-42.368-19.552-82.773333-47.541333-119.2-82.144z",
        "size": {
            "x0":0,
            "y0":0,
            "width": 1.4,
            "height":1
        }
    },{
        "name": "读取位置信息",//1
        "color": "#BACA5C",
        "icon": "M648.256 850.272a32 32 0 1 1-40.704-49.386667C758.304 676.693333 832 566.037333 832 471.072 832 293.344 688.693333 149.333333 512 149.333333c-176.693333 0-320 144.010667-320 321.738667 0 115.232 108.416 253.045333 329.173333 409.493333a32 32 0 0 1-37.013333 52.213334C248.021333 765.429333 128 612.853333 128 471.072 128 258.069333 299.882667 85.333333 512 85.333333s384 172.736 384 385.738667c0 118.378667-83.701333 244.053333-247.744 379.2zM512 618.666667c-82.474667 0-149.333333-66.858667-149.333333-149.333334s66.858667-149.333333 149.333333-149.333333 149.333333 66.858667 149.333333 149.333333-66.858667 149.333333-149.333333 149.333334z m0-64a85.333333 85.333333 0 1 0 0-170.666667 85.333333 85.333333 0 0 0 0 170.666667z",
        "size": {
            "x0":1.4,
            "y0":0,
            "width": 0.6,
            "height":1
        }
    },{
        "name": "读取联系人",//2
        "color": "#EED05D",
        "icon": "M512 128C406.272 128 320 214.272 320 320s86.272 192 192 192 192-86.272 192-192-86.272-192-192-192z m0 384a320.64 320.64 0 0 0-320 320h64c0-141.76 114.24-256 256-256s256 114.24 256 256h64c0-176.256-143.744-320-320-320z m0-320c71.04 0 128 56.96 128 128 0 71.04-56.96 128-128 128-71.04 0-128-56.96-128-128 0-71.04 56.96-128 128-128z",
        "size": {
            "x0":0,
            "y0":1,
            "width": 1,
            "height":1.3
        }
    },{
        "name": "新建/修改/删除联系人",//3
        "text": `<tspan dx="-30">新建/修改/删除</tspan><tspan dx="-150" dy="40">联系人</tspan>`,
        "color": "#859FD0",
        "icon": "M823.466667 110.933333H200.533333c-17.066667 0-29.866667 12.8-29.866666 29.866667v738.133333c0 17.066667 12.8 34.133333 34.133333 34.133334h422.4c17.066667 0 34.133333-12.8 34.133333-34.133334 0-17.066667-12.8-34.133333-34.133333-34.133333H234.666667V174.933333h558.933333v708.266667c0 17.066667 12.8 34.133333 34.133333 34.133333 17.066667 0 34.133333-12.8 34.133334-34.133333V140.8c-8.533333-17.066667-21.333333-29.866667-38.4-29.866667z M678.4 482.133333h-136.533333V345.6c0-17.066667-12.8-34.133333-34.133334-34.133333-17.066667 0-34.133333 12.8-34.133333 34.133333v136.533333h-128c-17.066667 0-34.133333 12.8-34.133333 34.133334 0 17.066667 12.8 34.133333 34.133333 34.133333h128v128c0 17.066667 12.8 34.133333 34.133333 34.133333 17.066667 0 34.133333-12.8 34.133334-34.133333v-128h136.533333c17.066667 0 34.133333-12.8 34.133333-34.133333-4.266667-21.333333-17.066667-34.133333-34.133333-34.133334z",
        "size": {
            "x0":1,
            "y0":1,
            "width": 1,
            "height":0.5
        }
    },{
        "name": "调用摄像头",//4
        "color": "#C2A3CD",
        "icon": "M269.44 256l23.296-75.381333A74.666667 74.666667 0 0 1 364.074667 128h295.850666a74.666667 74.666667 0 0 1 71.338667 52.618667L754.56 256H821.333333c64.8 0 117.333333 52.533333 117.333334 117.333333v426.666667c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V373.333333c0-64.8 52.533333-117.333333 117.333334-117.333333h66.773333z m23.605333 64H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v426.666667a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V373.333333a53.333333 53.333333 0 0 0-53.333334-53.333333h-90.378666a32 32 0 0 1-30.570667-22.549333l-30.272-97.930667a10.666667 10.666667 0 0 0-10.186667-7.52H364.074667a10.666667 10.666667 0 0 0-10.186667 7.52l-30.272 97.92A32 32 0 0 1 293.045333 320zM512 725.333333c-88.362667 0-160-71.637333-160-160 0-88.362667 71.637333-160 160-160 88.362667 0 160 71.637333 160 160 0 88.362667-71.637333 160-160 160z m0-64a96 96 0 1 0 0-192 96 96 0 0 0 0 192z",
        "size": {
            "x0":0,
            "y0":2.3,
            "width": 1,
            "height":0.7
        }
    },{
        "name": "启动录音",//5
        "color": "#CD6A53",
        "icon": "M544 851.946667V906.666667a32 32 0 0 1-64 0v-54.72C294.688 835.733333 149.333333 680.170667 149.333333 490.666667v-21.333334a32 32 0 0 1 64 0v21.333334c0 164.949333 133.717333 298.666667 298.666667 298.666666s298.666667-133.717333 298.666667-298.666666v-21.333334a32 32 0 0 1 64 0v21.333334c0 189.514667-145.354667 345.066667-330.666667 361.28zM298.666667 298.56C298.666667 180.8 394.165333 85.333333 512 85.333333c117.781333 0 213.333333 95.541333 213.333333 213.226667v192.213333C725.333333 608.533333 629.834667 704 512 704c-117.781333 0-213.333333-95.541333-213.333333-213.226667V298.56z m64 0v192.213333C362.666667 573.12 429.557333 640 512 640c82.496 0 149.333333-66.805333 149.333333-149.226667V298.56C661.333333 216.213333 594.442667 149.333333 512 149.333333c-82.496 0-149.333333 66.805333-149.333333 149.226667z",
        "size": {
            "x0":1,
            "y0":1.5,
            "width": 1,
            "height":1.5
        }
    }
];

let texturelist = {};
let svg,
    authority_g,
    authority_groups,
    vis_g,//大的组
    people_groups;//每一个人的group

let dataSet;