require 'rails_helper'

RSpec.describe Api::VotesController, type: :controller do
  let!(:contest) { create(:contest) }
  let!(:participant) { create(:participant) }
  let!(:contest_participant) { create(:contest_participant, contest: contest, participant: participant) }

  describe "POST #create" do
    it "creates a new vote" do
      expect {
        post :create, params: { contest_id: contest.id, participant_id: participant.id }
      }.to change(Vote, :count).by(1)
      expect(response).to have_http_status(:created)
    end
  end
end
