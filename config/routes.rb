Rails.application.routes.draw do
  # routes for home & login
  root to: 'home#home'

  # users
  resources :users do
    resources :worlds, :only => [:show, :new, :create]
  end

  # friends
  resources :friends, :only => [:index]

  # travels
  resources :travels do
    resources :steps do
      resources :toolboxes do
        resources :items
      end
    end
    resources :participants
  end

  # Api for fetching facebook friends using twitter typeahead
  get "participants/autocomplete" => "travels#autocomplete"

  # Exploration page
  get "discover" => "travels#explore"

  #get 'show' => 'travels#show'

  # Try for namespaces

  #get 'travels/:title', to: 'travels#show', as: :specific_travel
  #get 'travels/:title/steps/:place', to: 'steps#show'
  #get 'travels/:title/steps/:place/toolboxes/:id', to: 'toolboxes#show'

  # login
  get '/auth/:provider/callback' => 'sessions#create'
  get '/auth/failure' => 'sessions#failure'
  get '/signout' => 'sessions#destroy', :as => :sign_out
  get '/signin' => 'sessions#new', :as => :signin
end
