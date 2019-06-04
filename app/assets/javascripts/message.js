$(function(){

  function buildHTML(data) {

    var html = `<p>
                    <strong>
                      <a href=/groups/${message.user_id}>${message.user_name}</a>
                      ：
                    </strong>
                    ${message.text}

                    <strong>
                    ${message.image}
                    </strong>
                  </p>`
    
    // $('<div class="center__messages--tubuyaki">');

    
    return html
  }
  
  // .append(data.content)
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
    .done(function(data) {
      var html = buildHTML(data);
      $('.canter__messages--user-name').append(html);
      $('.center__messages--tubuyaki').append(html);
      $('.center__messages--image').append(html);
      textField.val('');
    })
    .fail(function() {
      alert('error');
    });
  })
})