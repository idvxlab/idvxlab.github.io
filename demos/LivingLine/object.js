    // color transform
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var color = new THREE.Color("rgb(255, 0, 0)");
    String.prototype.colorRgb = function(){
        var sColor = this.toLowerCase();
        if(sColor && reg.test(sColor)){
            if(sColor.length === 4){
                var sColorNew = "#";
                for(var i=1; i<4; i+=1){
                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for(var i=1; i<7; i+=2){
                sColorChange.push(parseInt("0x"+sColor.slice(i,i+2))/255.0);
            }
            // return "rgb(" + sColorChange.join(",") + ")";
            return sColorChange;
        }else{

            return sColor;

        }

    };


    // if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
    var camera, controls, scene, raycaster, renderer;
    var list=[];
    var mouse = new THREE.Vector2(), INTERSECTED;
    var test=[],test_floor, test_floor_2, test_light;
    var ro_object=0;
    var choice='people';

    var days = 0;
    var hours = 0;
    var grid_size=13.4
    var x_init = -84*grid_size/2
    var z_init = -24*grid_size/2
    var move = 120
    function num_to_days(num){
        if(num==0)
            return "一"
        if(num==1)
            return "二"
        if(num==2)
            return "三"
        if(num==3)
            return "四"
        if(num==4)
            return "五"
        if(num==5)
            return "六"
        if(num==6)
            return "日"
    }


    test = JSON.parse(data)
    console.log(test[0][6]);

    for(var i=0;i<test.length;i++){
        for(var j=0; j<test[0].length; j++) {
            test[i][j]['people_half'] = []
            test[i][j]['sell_half'] = []
            test[i][j]['energy_half'] = []

            // test[i][j].red = []
            // test[i][j].green = []
            // test[i][j].blue = []

            test[i][j].people_red = []
            test[i][j].people_green = []
            test[i][j].people_blue = []

            test[i][j].sell_red = []
            test[i][j].sell_green = []
            test[i][j].sell_blue = []

            test[i][j].energy_red = []
            test[i][j].energy_green = []
            test[i][j].energy_blue = []


            for(var k=0;k<168;k++){

                test[i][j].people_red.push(test[i][j].people_colors[k].colorRgb()[0])
                test[i][j].people_green.push(test[i][j].people_colors[k].colorRgb()[1])
                test[i][j].people_blue.push(test[i][j].people_colors[k].colorRgb()[2])

                test[i][j].sell_red.push(test[i][j].sell_colors[k].colorRgb()[0])
                test[i][j].sell_green.push(test[i][j].sell_colors[k].colorRgb()[1])
                test[i][j].sell_blue.push(test[i][j].sell_colors[k].colorRgb()[2])

                test[i][j].energy_red.push(test[i][j].energy_colors[k].colorRgb()[0])
                test[i][j].energy_green.push(test[i][j].energy_colors[k].colorRgb()[1])
                test[i][j].energy_blue.push(test[i][j].energy_colors[k].colorRgb()[2])

                test[i][j].people_num[k] /=1
                test[i][j].sell_num[k] /= 15
                test[i][j].energy_num[k] /= 2


                test[i][j].people_num[k] = test[i][j].people_num[k]+1
                test[i][j].people_half.push(Math.round(test[i][j].people_num[k]/2))

                test[i][j].sell_num[k] = test[i][j].sell_num[k]+1
                test[i][j].sell_half.push(Math.round(test[i][j].sell_num[k]/2))

                test[i][j].energy_num[k] = test[i][j].energy_num[k]+1
                test[i][j].energy_half.push(Math.round(test[i][j].energy_num[k]/2))



            }
        }
    }

    var controls1 = new function () {
            this.y_move = 0;
        };
    var controlsa = new function () {
        this.y_move = 0;
    };
    var controlsb = new function () {
        this.y_move = 0;
    };
    var controls2 = new function () {
        this.x_move = 0;
    };
    var controls3 = new function () {
        this.z_move = 0;
    };

    //创建dat.GUI，传递并设置属性
    //var gui = new dat.GUI();
    // gui.add(controls1, 'y_move', -2000, 2000);
    // gui.add(controlsa, 'y_move', -2000, 2000);
    // gui.add(controlsb, 'y_move', -2000, 2000);
    // gui.add(controls3, 'z_move', -2000, 2000);
    // gui.add(controls2, 'x_move', -2000, 2000);
    init();
    animate();
 
    function init() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xaecaf0);
        // scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
        raycaster = new THREE.Raycaster();
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild( renderer.domElement );
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set( -500, 2000,3000);
        // controls
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.minDistance = 100;
        controls.maxDistance = 2000
        controls.maxPolarAngle = Math.PI / 4;
        controls.object.position.set(-2300, 2300, 2300);
        controls.target = new THREE.Vector3(0, 0, 0);

        new THREE.MTLLoader()
            .setPath( 'assets/' )
            .load( '3dmaxDeleteRoad.mtl', function(materials){
                materials.preload();

                new THREE.OBJLoader()
                    .setMaterials( materials )
                    .setPath( 'assets/' )
                    .load( '3dmaxDeleteRoad.obj', function(object){
                        // object.position.y = - 95;
                        object.rotation.y = 0
                        object.position.y = 1
                        object.position.x = move+x_init
                        object.position.z = move+z_init

                        object.castShadow = true; //default is false
                        object.receiveShadow = true; //default
                        ro_object = object;

                        object1 = object;               
                         for(var k in object.children){                                                                                               
                            object.children[k].castShadow = true;  
                            object.children[k].receiveShadow = true; 
                         }

                        scene.add( object1 );

                        $('#data_ui').on('click',function(){      
                            scene.remove( object1 );
                            scene.remove(test_floor_2)
                            scene.add(test_floor)
                        });
  
                        $('#model_ui').on('click',function(){   
                            scene.add( object1 );
                            scene.remove(test_floor)
                            scene.add(test_floor_2)
                        }); 
                    });
            } );

        loader = new THREE.JSONLoader();
        
        loader.load( 'assets/blenderDeleteRoad.obj', function( geometry ) {
            var mesh = new THREE.Mesh( geometry, new THREE.MeshNormalMaterial() );
            scene.add(mesh)
        } );
       

        var tween = new TWEEN.Tween()
        // world
        var rate = 2.2
        var floor = new THREE.PlaneGeometry(7401*rate,4017*rate);
        var texture = THREE.ImageUtils.loadTexture("assets/MAP.png");
        var material_floor = new THREE.MeshLambertMaterial({
            map: texture,
            side: THREE.DoubleSide
            //color: 0xd6d5da

        });
        var mesh_floor = new THREE.Mesh(floor,material_floor);
        mesh_floor.rotation.x = -90/180*Math.PI;
        mesh_floor.rotation.z = 26/180*Math.PI
        mesh_floor.position.x = move+419
        mesh_floor.position.z = move+506
        mesh_floor.position.y = -1
        test_floor = mesh_floor;
        mesh_floor.receiveShadow = true;
        // scene.add(mesh_floor);

        var material_floor_2 = new THREE.MeshLambertMaterial({
            // map: texture,
            // side: THREE.DoubleSide
            color: 0xd6d5da

        });
        var mesh_floor_2 = new THREE.Mesh(floor,material_floor_2);
        mesh_floor_2.rotation.x = -90/180*Math.PI;
        mesh_floor_2.rotation.z = 119/180*Math.PI
        mesh_floor_2.position.x = move+419
        mesh_floor_2.position.z = move+506
        mesh_floor_2.position.y = -1
        test_floor_2 = mesh_floor_2
        mesh_floor_2.castShadow = false;
        mesh_floor_2.receiveShadow = true
        scene.add(mesh_floor_2);

        var geometry = new THREE.CubeGeometry( 3, 1, 3);
        for ( var i = 0; i < test.length; i ++ ) {
            var temp_list = []
            for(var j=0; j<test[0].length;j++) {

                var material = new THREE.MeshPhongMaterial({
                    color:  new THREE.Color(test[i][j].people_red[0], test[i][j].people_green[0] ,test[i][j].people_blue[0]),

                    transparent: true,
                    opacity: 0.8
                });
                var mesh = new THREE.Mesh( geometry, material );
                // if(test[i][j].isBuilding){
                    mesh.scale.y = test[i][j].people_num[0]
                    mesh.position.y = test[i][j].people_half[0];

                // }else{
                //     mesh.scale.y = 1
                //     mesh.position.y = 0;
                // }
                mesh.position.x = move+x_init+j*grid_size;
                mesh.position.z = move+z_init+i*grid_size;
                mesh.updateMatrix();
                mesh.castShadow = false;
                mesh.receiveShadow = false;
                temp_list.push(mesh);
                // mesh.matrixAutoUpdate = false;
                //scene.add( mesh );
            }
            list.push(temp_list)
        }

        //lights
         
        //创建聚光灯
        var spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(-100, 4000, -1200);
        spotLight.castShadow = true;
        spotLight.shadow.camera.far = 30000;
        spotLight.shadowMapWidth = 2048;
        spotLight.shadowMapHeight = 2048;
        //spotLight.shadow.bias = 0.005;
        // spotLight.target = target;
        scene.add(spotLight);
        // var helper = new THREE.CameraHelper(spotLight.shadow.camera );
        // scene.add(helper);


        //创建平行光
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
        directionalLight.position.set( 22, 200, -19 );
        directionalLight.castShadow = false;
        scene.add(directionalLight);
         
        //显示光照区域
        // var helper = new THREE.CameraHelper(directionalLight.shadow.camera );
        // scene.add(helper);


        var light = new THREE.DirectionalLight( 0xffffff, 0.6 );
        light.position.set( 223, 1000, -189 );
        light.castShadow = false;

        // test_light = light;
        // scene.add( light );

        // var helper = new THREE.CameraHelper(light.shadow.camera );
        // scene.add(helper);


        var light = new THREE.AmbientLight( 0xffffff, 0.6);
        light.castShadow = false;
        scene.add( light );
        
        // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        window.addEventListener( 'resize', onWindowResize, false );

    }

    $("#vis_user").on("click",function(){
        choice = 'people';
        updateData(list, test, choice, days*24+hours, 2000)
        console.log(choice);
    });
    $("#vis_money").on("click",function(){
        choice = 'sell';
        updateData(list, test, choice, days*24+hours, 2000)
        console.log(choice);
    });
    $("#vis_energy").on("click",function(){
        choice = 'energy';
        updateData(list, test, choice, days*24+hours, 2000)
        console.log(choice);
    });


    $('#data_ui').on('click',function(){   
        for (var i=0; i<list.length; i++){
            for (var j=0; j<list[0].length; j++){
                scene.add(list[i][j]);
                list[i][j].castShadow = true;
                list[i][j].receiveShadow = true;
            }
        } 
        //scene.remove( mesh );     
    });

    $('#model_ui').on('click',function(){  
        for (var i=0; i<list.length; i++){
            for (var j=0; j<list[0].length; j++){
                scene.remove(list[i][j]);
            }
        }  
        //scene.add( mesh );                              
    }); 

    function updateData(list, test, choice, d_id, timeIntervel){

        for ( var i = 0; i < list.length; i ++ ) {
            for(var j=0; j<list[0].length; j++){
                //console.log(i)
                //console.log(j)
                console.log(choice+"_num");
                console.log(test[i][j][String(choice)+"_num"][d_id]);
                //d_id = String(d_id);
                new TWEEN.Tween(list[i][j].scale).to(
                    {   x:1,
                        y:test[i][j][choice+"_num"][d_id],
                        z:1  }
                    , timeIntervel)
                    .easing(TWEEN.Easing.Back.Out)
                    .start();
                new TWEEN.Tween(list[i][j].position).to(
                    {   x:move+x_init+j*grid_size,
                        y:test[i][j][choice+"_half"][d_id],
                        z:move+z_init+i*grid_size }
                    , timeIntervel)
                    .easing(TWEEN.Easing.Back.Out)
                    .start();
                new TWEEN.Tween(list[i][j].material.color).to(
                    {   r:test[i][j][choice+"_red"][d_id],
                        g:test[i][j][choice+"_green"][d_id],
                        b:test[i][j][choice+"_blue"][d_id]  }
                    , timeIntervel)
                    .easing(TWEEN.Easing.Back.Out)
                    .start();
            }
        }
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    //time 事件
    $(function() {
        $( "#day_slider" ).slider({
            min: 0,
            max: 6,
            animate: "fast",
            step: 1,
            value: 0,
            slide: function(event,ui){

                days = ui.value;

                $( "#d_vals" ).text('周'+num_to_days(days));
                var d_i = days*24+hours
                updateData(list, test, choice, d_i, 1000)

            },

        });
    });

    $(function() {
        $( "#hour_slider" ).slider({
            min: 0,
            max: 23,
            animate: "fast",
            step: 1,
            value: 0,
            slide: function(event,ui){

                hours = ui.value;
                if(hours<13){
                    $( "#vals" ).text(hours+' AM');
                }
                else{
                    $( "#vals" ).text((hours-12)+' PM');
                }
                var d_i = days*24+hours
                updateData(list, test, choice, d_i, 1000)
            }
         });
    });


    function animate() {
        requestAnimationFrame( animate );
        controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

        render();
    }
    function render() {


        // test_floor.position.x = controls2.x_move
        // test_floor.position.z = controls3.z_move
        TWEEN.update();
        renderer.render( scene, camera );
    }
 

