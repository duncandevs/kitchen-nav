Rails.application.routes.draw do
  get 'sessions/new'

  root 'static_pages#home'
  get 'user', to: 'users#show'
  get 'favorites', to: 'favorites#show'
  get 'users/new'
  get '/signup', to: 'users#new'
  post '/signup',  to: 'users#create'
  get    '/login',   to: 'sessions#new'
  post   '/login',   to: 'sessions#create'
  delete '/logout',  to: 'sessions#destroy'
  get  '/recipes/new', to: 'recipes#new'
  post '/recipes/new', to: 'recipes#create'
  get '/guest', to: 'sessions#guest'
  get '/explore' , to: 'recipes#explore'
  get '/follow' , to: 'favorites#follow'
  resources :users
  resources :recipes
  resources :favorites
  resources :users do
     member do
       get :following, :followers
     end
   end
  resources :relationships,       only: [:create, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
