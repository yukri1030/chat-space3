json.content  @message.content
json.image @message.image.url
json.user_name  @message.user.name
json.time @message.created_at.strftime("%Y/%m/%d %H:%M")