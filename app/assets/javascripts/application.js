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


// 初期設定
var MyLatLng = new google.maps.LatLng(37.916194,139.036389);
var Options = {
zoom: 6,      //地図の縮尺値
center: MyLatLng,    //地図の中心座標
mapTypeId: 'roadmap'   //地図の種類
};
var map = new google.maps.Map(document.getElementById('map'), Options);

// じゃんけんトンネルのマーク
 var marker = new google.maps.Marker({
  position: new google.maps.LatLng(35.823665, 139.920940),
  map: map,
 });
 var myInfoWindow = new google.maps.InfoWindow({
  // 吹き出しに出す文
  content: "じゃんけんトンネル"
});
// 吹き出しを開く
myInfoWindow.open(map, marker);
// 吹き出しが閉じられたら、マーカークリックで再び開くようにしておく
google.maps.event.addListener(myInfoWindow, "closeclick", function() {
  google.maps.event.addListenerOnce(marker, "click", function(event) {
    myInfoWindow.open(map, marker);
  });
});

// 基幹バスレーンのマーク
var marker = new google.maps.Marker({
  position: new google.maps.LatLng(35.182952, 136.954826),
  map: map,
 });
 var myInfoWindow = new google.maps.InfoWindow({
  // 吹き出しに出す文
  content: "魔の道路"
});
// 吹き出しを開く
myInfoWindow.open(map, marker);
// 吹き出しが閉じられたら、マーカークリックで再び開くようにしておく
google.maps.event.addListener(myInfoWindow, "closeclick", function() {
  google.maps.event.addListenerOnce(marker, "click", function(event) {
    myInfoWindow.open(map, marker);
  });
});