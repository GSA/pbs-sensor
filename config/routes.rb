Rails.application.routes.draw do
  resources :rooms do
    resources :readings, only: [:index, :show]
  end

  root "rooms#index"
end
