$(document).on('turbolinks:load', function(){
$(function(){

  function buildHTML(message) {
    var image = message.image? `${message.image}` : "";
    var html = `<div class ="center__messages" message_id = "${message.id}" group_id= "${message.group_id}">
                  <div class ="center__messages--user-name">
                ${message.user_name}
                  </div>
                  <div class = "center__messages--info">
                  ${message.time}
                  </div>
                  <div class = "center-messages--tubuyaki">
                    <div class = "lower-message__content">
                    ${message.content}
                    </div>
                    <img class ="lower-message__image" src="${image}">
                    </div>
                  </div>
               </div>`

    return html
   
  }
  
 
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message) {
      var html = buildHTML(message);
      $('.center').append(html);
      $('.center').animate({scrollTop: $('.center')[0].scrollHeight}, 'fast');
      $('.form__submit').prop('disabled', false)
      $('.new_message')[0].reset();
    })
    .fail(function() {
      alert('error');
    });
  })
})
$(function(){
 function buildMessageHTML(message) {
  var image = message.image? `${message.image}` : "";
  var content = message.content? `${message.content}` : "";
  var html = `<div class ="center__messages" message_id = "${message.id}" group_id= "${message.group_id}">
                <div class ="center__messages--user-name">
              ${message.user_name}
                </div>
                <div class = "center__messages--info">
                ${message.time}
                </div>
                <div class = "center-messages--tubuyaki">
                  <div class = "lower-message__content">
                  ${content}
                  </div>
                  <img class ="lower-message__image" src="${image}">
                  </div>
                </div>
              </div>`

    return html
   
  }


  $(function(){
   
  var reloadMessages= function() {
    var group_id = $('.center__messages:last').attr('group_id');
    var path = `/groups/${group_id}/api/messages`
    var messageId = $('.center__messages:last').attr('message_id');
    $.ajax ({
      url: path,
      type: 'GET',
      data: { message_id : messageId }, 
      dataType: 'json',
    })
    .done(function(messages) {
      messages.forEach(function(message){
        var insertHTML = buildMessageHTML(message); 
        $('.center').append(insertHTML);      
        $('.center').animate({scrollTop: $('.center')[0].scrollHeight}, 'fast');
      })
    })
    .fail(function() {
      console.log('error');
    });
  }
  setInterval(reloadMessages, 5000);
});
});
});