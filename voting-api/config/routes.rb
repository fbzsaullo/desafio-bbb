Rails.application.routes.draw do
  namespace :api do
    post 'login', to: 'authentication#login'

    resources :contests, only: [:index, :show, :create] do
    collection do
      get 'actived', to: 'contests#actived'
      get 'actived_votes', to: 'contests#actived_votes'
    end
    
    patch 'complete', on: :member, to: 'contests#complete'
      
      resources :participants, only: [] do
        member do
          get 'votes', to: 'participants#show_votes'
        end

        resources :votes, only: [:create]
      end
    end

    resources :participants, only: [:index, :create]
  end
end
