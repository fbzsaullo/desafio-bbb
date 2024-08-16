class Api::AuthenticationController < ApplicationController
  before_action :authorize_request, except: :login

  def login
    @user = User.find_by(email: login_params[:email])
    if @user&.authenticate(login_params[:password])
      render json: { api_key: @user.api_key }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:email, :password)
  end
end
