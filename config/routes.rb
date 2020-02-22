Rails.application.routes.draw do
  root to: 'tops#index'
  resources :users
  resources :posts

end
