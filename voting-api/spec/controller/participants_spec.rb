require 'rails_helper'

RSpec.describe Api::ParticipantsController, type: :controller do
  subject { create(:participant) }

  describe 'POST #create' do
    it 'should create a participant' do
      post :create, params: { participant: { name: 'John Doe'  } }
      expect(response).to have_http_status(:created)
      expect(JSON.parse(response.body)['name']).to eq('John Doe')
    end

    it 'should create a participant with a photo' do
      photo_base64 = Base64.encode64(File.open(Rails.root.join('spec/fixtures/files/test_image.jpg')).read)
      
      post :create, params: { participant: { name: 'John Doe', photo_base64: photo_base64 } }
      
      expect(response).to have_http_status(:created)
      json_response = JSON.parse(response.body)
      expect(json_response['name']).to eq('John Doe')
      expect(json_response['photo_url']).to be_present
    end

    it 'should not create a participant without a name' do
      post :create, params: { participant: { name: '' } }
      expect(response).to have_http_status(422)
    end
  end

  describe 'GET #index' do
    it 'should return all participants' do
      number_participants = Participant.all.count

      get :index
      expect(response).to have_http_status(:ok)

      body = JSON.parse(response.body)
      expect(body.count).to eq(number_participants)
    end
  end

  describe 'DELETE #destroy' do
    it 'should delete a participant' do
      delete :destroy, params: { id: subject.id }
      expect(response).to have_http_status(:no_content)
      expect(Participant.exists?(subject.id)).to be_falsey
    end
  end
end