Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to :'devise/session#new'
  get 'message/index' => "messages#index"
end