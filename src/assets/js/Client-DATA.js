ipChecking();
urlChecking();

function ipChecking(){
    $.getJSON('https://api.ipify.org?format=json', function(data){
      const ip =data.ip;
      firebase.database().ref('ClientData').push({
          ip:ip,
          date:new Date()+""
        });
    });
}

function urlChecking(){
    firebase.database().ref('ClientURL').push({
        url:document.location.href,
        timestamp:new Date().getTime()
    });
}