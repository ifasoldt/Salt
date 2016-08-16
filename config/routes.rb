Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

resources :events, except: [:create, :update]
resources :users, except:[:index, :edit, :create, :new, :update]
resources :user_sessions, only: [:destroy]
resources :applications, only: [:create, :destroy]
resources :thumbs, only: [:create]

root 'welcome#index'

# sign_up
post '/api/users' => 'users#create'
# user_dashboard
get '/users/dashboard' => 'users#dashboard'
# user update
put '/api/users/:id' => 'users#update'
patch '/api/users/:id' => 'users#update'
# create event
post 'api/events' => 'events#create'
patch 'api/events/:id' => 'events#update'
put 'api/events/:id' => 'events#update'


# sign_in
post '/api/sign_in' => 'user_sessions#create'

end
