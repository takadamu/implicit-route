Rails.application.routes.draw do
  devise_for :users
  root to: 'tops#index'
  resources :users
  resources :posts do
    collection do
      get 'search'
    end
  end
end
