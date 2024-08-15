Rails.application.routes.draw do
  namespace :api do
    resources :contests, only: [:index, :show, :create] do
      resources :participants, only: [] do
        member do
          get 'votes', to: 'participants#show_votes'
        end

        resources :votes, only: [:create]
      end
    end

    resources :participants, only: [:index, :create, :destroy]
  end
end
