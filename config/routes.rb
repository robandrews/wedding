Wedding::Application.routes.draw do
  root to: 'static_pages#home'
  resources :messages, :only => [:create]
end
