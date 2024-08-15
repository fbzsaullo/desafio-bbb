require 'rails_helper'

RSpec.describe Api::ContestsController, type: :controller do
  let(:contest) { create(:contest) }

  before do
    Contest.all.update_all(status: 'completed')
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

  describe "PATCH #complete" do
    it "completes a contest" do
      contest = create(:contest)
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
