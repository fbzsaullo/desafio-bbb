class ApplicationController < ActionController::API
  rescue_from JWT::VerificationError, with: :invalid_token
  rescue_from JWT::DecodeError, with: :decode_error

  protected

  def authenticate
    authorization_header = request.headers['Authorization']
    token = authorization_header.split(" ").last if authorization_header
  
    begin
      decoded_token = JsonWebToken.decode(token).first
      @current_user = User.find(decoded_token['user_id'])
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'User not found' }, status: :unauthorized
    end
  end
  
  def current_user
    @current_user
  end

  def invalid_token
    render json: { invalid_token: 'invalid token' }, status: :unauthorized
  end

  def decode_error
    render json: { decode_error: 'decode error' }, status: :unauthorized
  end
end