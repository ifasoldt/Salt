Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

resources :events
resources :users, except:[:index, :edit, :create, :new]
resources :user_sessions, only: [:destroy]
resources :applications, only: [:create, :destroy]
resources :thumbs, only: [:create]

root 'welcome#index'

# sign_up
post '/api/users' => 'users#create'

# sign_in
post '/api/sign_in' => 'user_sessions#create'

end
