require 'rails_helper'

RSpec.describe Api::ContestsController, type: :controller do
  subject(:user) { create(:user, password: 'password') }
  let(:contest) { create(:contest) }

  before do
    token = JsonWebToken.encode(user_id: user.id)

    request.headers['Authorization'] = token

    Contest.update_all(status: 'completed')
  end

  describe "GET #index" do
    it "returns a success response" do
      get :index
      expect(response).to have_http_status(:success)
      expect(JSON.parse(response.body).length).to eq(Contest.count)
    end
  end

  describe "GET #show" do
    it "returns a success response with contest details" do
      get :show, params: { id: contest.id }
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      expect(json_response['contest']['id']).to eq(contest.id)
      expect(json_response['votes_by_participant'].length).to eq(contest.participants.count)
    end
  end

  describe "POST #create" do
    it "creates a new contest" do
      participant = create(:participant)
      expect {
        post :create, params: { contest: { participant_ids: [participant.id] } }
      }.to change(Contest, :count).by(1)
      expect(response).to have_http_status(:created)
    end

    it "returns an error when the contest is invalid" do
      post :create, params: { contest: { participant_ids: nil } }
      expect(response).to have_http_status(422)
    end
  end

  describe "GET #actived" do
    it "returns the last active contest" do
      contest = create(:contest, status: 'active')
      get :actived
      expect(response).to have_http_status(:success)
      json_response = JSON.parse(response.body)
      expect(json_response['contest']['id']).to eq(contest.id)
    end

    it "returns an error when there is no active contest" do
      get :actived
      expect(response).to have_http_status(404)
    end
  end

  describe "GET #actived_votes" do
    it "returns the votes of the last active contest" do
      contest = create(:contest, status: 'active')
      create_list(:vote, 3, contest: contest, participant: contest.participants.first)
      
      get :actived_votes
  
      response_body = JSON.parse(response.body)
      
      expect(response).to have_http_status(:success)
      expect(response_body['participants'].first['votes'].count).to eq(3)
    end
  end

  describe "PATCH #complete" do
    it "completes a contest" do
      contest = create(:contest, status: 'active')
      patch :complete, params: { id: contest.id }
      expect(response).to have_http_status(:success)
      expect(contest.reload.status).to eq('completed')
    end

    it "returns an error when the contest is already completed" do
      contest = create(:contest, status: 'completed')
      patch :complete, params: { id: contest.id }
      expect(response).to have_http_status(422)
    end
  end
end
