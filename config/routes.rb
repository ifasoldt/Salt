Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

resources :events, except: [:create, :update]
resources :users, except:[:index, :edit, :create, :new, :update]
resources :applications, only: [:create, :destroy]
resources :thumbs, only: [:create]

root 'welcome#index'

# sign_up
post '/api/users' => 'users#create'
# user_dashboard
get '/current_user/dashboard/' => 'users#dashboard'
# user update
put '/api/users/:id' => 'users#update'
patch '/api/users/:id' => 'users#update'
# create event
post 'api/events' => 'events#create'
patch 'api/events/:id' => 'events#update'
put 'api/events/:id' => 'events#update'


# sign_in
post '/api/sign_in' => 'user_sessions#create'
# sign out
delete '/logout' => 'user_sessions#destroy'

end
