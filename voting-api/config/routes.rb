Rails.application.routes.draw do
  namespace :api do
    resources :participants, only: [:index, :create, :destroy]
  end
end
