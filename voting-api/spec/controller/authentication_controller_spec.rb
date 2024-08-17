require 'rails_helper'

RSpec.describe Api::AuthenticationController, type: :controller do
  subject(:user) { create(:user, password: 'password') }

  describe 'POST #login' do
    context 'with valid credentials' do
      it 'returns a JWT token and expiration time' do
        post :login, params: { email: user.email, password: 'password' }
        
        expect(response).to have_http_status(:ok)
        
        json_response = JSON.parse(response.body)
        expect(json_response['token']).not_to be_nil
        expect(json_response['expires_at']).not_to be_nil

        decoded_token = JsonWebToken.decode(json_response['token']).first
        expect(decoded_token['user_id']).to eq(user.id)
      end
    end

    context 'with invalid credentials' do
      it 'returns an unauthorized status' do
        post :login, params: { email: user.email, password: 'wrong_password' }
        
        expect(response).to have_http_status(:unauthorized)
        
        json_response = JSON.parse(response.body)
        expect(json_response['error']).to eq('Invalid email or password')
      end
    end
  end
end
