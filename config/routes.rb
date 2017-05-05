Rails.application.routes.draw do
  # routes for home & login
  root to: 'home#home'

  # users
  resources :users

  # friends
  resources :friends, :only => [:index]

  # travels
  resources :travels

  # steps
  resources :steps

  # login
  get '/auth/:provider/callback' => 'sessions#create'
  get '/auth/failure' => 'sessions#failure'
  get '/signout' => 'sessions#destroy', :as => :sign_out
  get '/signin' => 'sessions#new', :as => :signin
end
