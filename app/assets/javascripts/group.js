$(document).on('turbolinks:load', function(){
 var search_list =  $("#user-search-result")
 var add_member = $("#chat-group-users")
  function appendUser(user){

  var html=     `<div id = "user-search-result">
                  <div class="chat-group-user clearfix">
                    <div id ="chat-group-users">
                      <p><chat-group-user__name">${user.name}
                      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id}" data-user-name=${user.name}>追加</a></p>
                    </div>
                  </div>
                </div>`
         search_list.append(html)
    }


  function appendErrMsgTouser(user){
    
    var html = `<div id='user-search-result'>
                  </div>`
                 
              search_list.append(html)

  }

  function  appendMember(userId, userName){
      var user =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                    <input name='group[user_ids][]' type='hidden' value=${userId}>
                    <p class='chat-group-user__name'>${userName}
                    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div></p>
                  </div>`

      add_member.append(user)
  }
    
  
    $("#user-search-field").on("keyup", function(e){
      e.preventDefault();
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(users) {
        $("#user-search-result").empty();
        console.log(users)
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);

          });
        }
        else {
          appendErrMsgTouser("一致するユーザーはありません");
          
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    });

    $(document).on("click",'.user-search-add',function () {
      console.log("aaa")
     
      var userId = $(this).attr('data-user-id');
      var userName = $(this).data('user-name');
      appendMember(userId, userName)
     
    });

    $(document).on("click",'.user-search-remove',function(){

       $(this).parent().remove();
    });
});