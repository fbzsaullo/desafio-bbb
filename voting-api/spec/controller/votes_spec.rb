require 'rails_helper'

RSpec.describe Api::VotesController, type: :controller do
  before do
    Contest.all.update_all(status: 'completed')
    ActiveJob::Base.queue_adapter = :test
  end
  
  describe "POST #create" do
    it "enqueues a VoteJob" do
      contest = create(:contest)
      participant = contest.participants.last
      expect {
        post :create, params: { contest_id: contest.id, participant_id: participant.id }
      }.to have_enqueued_job(VoteJob).with(contest.id, participant.id)
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)["message"]).to eq("Vote has been cast")
    end
  end
end
