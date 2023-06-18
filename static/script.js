const socket = io({
  auth: {
    cookie: document.cookie
  }
});
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');
const logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {
  document.cookie = 'token=; Max-Age=0';
  location.assign('/login');
});

socket.on('all_messages', function(msgArray) {
  msgArray.forEach(msg => {
    let item = document.createElement('li');
    item.textContent = msg.login + ': ' + msg.content;
    messages.appendChild(item);
  });
  window.scrollTo(0, document.body.scrollHeight);
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('new_message', input.value);
    input.value = '';
  }
});

socket.on('message', function(msg) {
    let item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

let url="https://api.weatherapi.com/v1/current.json?key=082bda8393a84a48a98170750231006&q=Kiev&aqi=no";
let xhr = new XMLHttpRequest();
xhr.responseType="json";
xhr.open("GET", url);
xhr.send();
let weather = "";
xhr.onload = function() {
	weather = xhr.response;
	console.log(weather);
  if (xhr.status > 399) {
    $("#result").html("There is some error...");
  }
  else {
    console.log(weather);
    console.log(weather.current);
    $('#icon').attr("src", "https:" + weather.current.condition.icon);
    $('#city').html(weather.location.country + " , " + weather.location.name);
    $('#temp').html(weather.current.temp_c + "°C");
  }
}

