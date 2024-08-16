require 'rails_helper'

RSpec.describe Api::AuthenticationController, type: :controller do
  subject(:user) { create(:user, password: 'password') }

  describe 'POST #login' do
    context 'with valid credentials' do
      it 'returns the api_key' do
        post :login, params: { email: subject.email, password: 'password' }
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['api_key']).to eq(subject.api_key)
      end
    end

    context 'with invalid credentials' do
      it 'returns an unauthorized status' do
        post :login, params: { email: user.email, password: 'wrong_password' }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
