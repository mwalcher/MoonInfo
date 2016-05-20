var curDate = new Date();
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
var days = ['Sunday','Monday','Tuesday','Wednesday','Thusday','Friday','Saturday'];

var today = (curDate.getTime()) / 1000;
var curWeek = [];
var count = 0;

function timeConverter(timestamp){
  var newDate = new Date(timestamp * 1000);
  var year = newDate.getFullYear();
  var month = months[newDate.getMonth()];
  var day = days[newDate.getDay()];
  var date = newDate.getDate();
  var fullDay = day + ', ' + month + ' ' + date + ' ' + year;
  return fullDay;
}

function getWeek(){
  //console.log(count);
  curWeek = [];
  for (var i = count; i < count+7; i++) {
    curWeek.push({
          'date': timeConverter(today + (86400*i)),
          'timestamp': today + (86400*i)
      });
  }
  //console.log(curWeek);
}

function ucFirst(str) {
  return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
}

window.addEventListener("load", getWeek, false);