$(document).on('turbolinks:load', function(){
$(function(){

  function buildHTML(message) {
    var image = message.image? `${message.image}` : "";
    var html = `<div class ="center__messages">
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
});