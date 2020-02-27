// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

var MyLatLng = new google.maps.LatLng(35.6811673, 139.7670516);
var Options = {
zoom: 15,      //地図の縮尺値
center: MyLatLng,    //地図の中心座標
mapTypeId: 'roadmap'   //地図の種類
};
var map = new google.maps.Map(document.getElementById('map'), Options);


var windowWidth; //ウィンドウ幅
var zoom = 13; //拡大の比率
var centerLating = {lat:33.836653, lng:132.736130}; //地図の中心デフォルト
var map;
var marker = [];
var data = [];
var windows = [];
var currentInfoWindow = null;

// リサイズの変数 -------------
$(window).on('resize', function() {
  windowWidth = $('body').innerWidth();
  if(windowWidth >= 768){
    zoom = 13; 
  } else {
    zoom = 12;
  }
}).trigger('resize');

function initialize() {
  // マップの基本設定−−−−−−−−−−−−−
  var myOptions = {
      center: centerLating, //中心点
      zoom: zoom, //拡大の比率 1〜21 小数点だとドラッグするとズームされる
      mapTypeId: google.maps.MapTypeId.ROADMAP, //地図のタイプを指定する（ROADMAP：デフォルトの道路地図、SATELLITE：航空写真、YBRID：通常のビューと航空写真の混合、TERRAIN：物理的なマップ）,
      styles: [スタイルのjsonを貼り付ける]
  }
  map = new google.maps.Map(document.getElementById('p-map'), myOptions);

  // ルート地点の変数−−−−−−−−−−−−−
  var ary = [
    { // 松山空港から目的地
      "start" :  new google.maps.LatLng(33.829061, 132.704098),
      "end" : new google.maps.LatLng(33.836255, 132.769006),
      "color" : "#45A1CF"
    },
    { // JR松山駅から目的地
      "start" :  new google.maps.LatLng(33.840394, 132.751300),
      "end" : new google.maps.LatLng(33.836255, 132.769006),
      "color" : "#DA6272"
    }
  ]
  // ルートの表示−−−−−−−−−−−−−
  for(var i in ary){
    fCalcRoute(ary[i]['start'], ary[i]['end'], ary[i]['color']);
  }

  // マーカーの表示−−−−−−−−−−−−−
  $.getJSON("./js/mapdata.json", function(json){
    for (var i = 0; i <= json.length-1; i++) {
      data.push({
        'name': json[i].name,
        'lat': json[i].lat,
        'lng': json[i].lng,
        'icon': json[i].icon,
        'sizeX': json[i].sizeX,
        'sizeY': json[i].sizeY
      });
    };
    for (var i = 0; i < data.length; i++) {
      // マーカーの追加−−−−−−−−−−−−−
      markerLatLng = {lat: data[i]['lat'], lng: data[i]['lng']};
      marker[i] = new google.maps.Marker({
        position: markerLatLng,
        map: map,
        title: data[i]['name'],
        icon: new google.maps.MarkerImage(
          data[i]['icon'],
          new google.maps.Size(data[i]['sizeX'], data[i]['sizeY']),    //マーカー画像のサイズ
          new google.maps.Point(0,0) //位置（0,0で固定）
        ),
      });
      // ウィンドウの内容の追加−−−−−−−−−−−−−
      windows[i] = new google.maps.InfoWindow({ // 吹き出しの追加
      content: '<div class="p-map__window">' + data[i]['name'] + '</div>'
      });
      markerEvent(i); // マーカーにクリックイベントを追加
    }
  });

  // クリックイベントの追加−−−−−−−−−−−−−
  // マーカークリックでInfoWindow表示
  function markerEvent(i) {
    marker[i].addListener('click', function() { // マーカーをクリックしたとき
      if (currentInfoWindow) {
        currentInfoWindow.close();
      }
      windows[i].open(map, marker[i]); // 吹き出しの表示
      currentInfoWindow = windows[i];
    });
  }

  // リサイズでズーム変更−−−−−−−−−−−−−
  google.maps.event.addDomListener(window, "resize", function() {
    google.maps.event.trigger(map, "resize");
    map.setZoom(zoom);
  });
}

//ルートを表示する関数
function fCalcRoute(start, end, color) {
  // ルート表示 設定
  rendererOptions = {
    draggable: true, //ドラッグ操作の有効/無効を設定する
    preserveViewport: true //境界のボックスにセンタリングされズームするかどうか（地図の中心とズームの設定がないと、ビューポートは変更されない）
  };
  var directionsDisplay =  new google.maps.DirectionsRenderer(rendererOptions);
  directionsDisplay.setOptions({
    polylineOptions: { //ルートの形状
      strokeColor: color, //色
      strokeOpacity: 0.8, //透過
      strokeWeight: 6 //線幅
    }, 
    suppressMarkers: true, //true:マーカー非表示
    suppressInfoWindows: true //true:ルート線非表示
  });
  var directionsService =  new google.maps.DirectionsService();
  var request = {
    origin: start, //出発場所
    destination: end, //到着場所
    travelMode: google.maps.DirectionsTravelMode.DRIVING, //交通手段を指定する（DRIVING:運転ルート、WALKING:徒歩ルート、BICYLING:自転車ルート）
    unitSystem: google.maps.DirectionsUnitSystem.METRIC, //単位km表示
    optimizeWaypoints: true, //最適化された最短距離にする
    avoidHighways: false, //高速道路（false:使用しない）
    avoidTolls: false //有料区間（false:使用しない）
  };
  directionsService.route(request,
    function(response,status){
      if (status == google.maps.DirectionsStatus.OK){
        directionsDisplay.setDirections(response);
      }
    }
  );
  directionsDisplay.setMap(map);
}



