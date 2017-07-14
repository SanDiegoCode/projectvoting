function fixCss() {
    var buttons = document.getElementsByClassName("submission"),
        len = buttons !== null ? buttons.length : 0,
        i = 0;
    for(i; i < len; i++) {
        buttons[i].className += " card blue-grey darken"; 
    }
    
    buttons = document.getElementsByClassName("submission-text"),
        len = buttons !== null ? buttons.length : 0,
        i = 0;
    for(i; i < len; i++) {
        buttons[i].className += " card-content"; 
    }
    
    buttons = document.getElementsByClassName("submission-upvote-button"),
        len = buttons !== null ? buttons.length : 0,
        i = 0;
    for(i; i < len; i++) {
        buttons[i].className += " card-action center"; 
    }
}
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
wait(1000)
fixCss()