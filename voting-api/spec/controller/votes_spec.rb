require 'rails_helper'

RSpec.describe Api::VotesController, type: :controller do
  let!(:contest) { create(:contest) }
  let!(:participant) { create(:participant) }
  let!(:contest_participant) { create(:contest_participant, contest: contest, participant: participant) }

  before do
    ActiveJob::Base.queue_adapter = :test
  end

  describe "POST #create" do
    it "enqueues a VoteJob" do
      expect {
        post :create, params: { contest_id: contest.id, participant_id: participant.id }
      }.to have_enqueued_job(VoteJob).with(contest.id, participant.id)
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["message"]).to eq("Vote has been cast")
    end
  end
end
