# spec/jobs/vote_job_spec.rb

require 'rails_helper'

RSpec.describe VoteJob, type: :job do
  before do
    Contest.all.update_all(status: 'completed')
  end

  describe "#perform" do
    it "creates a new vote" do
      contest = create(:contest)
      participant = contest.participants.last
      expect {
        VoteJob.perform_now(contest.id, participant.id)
      }.to change(Vote, :count).by(1)
    end

    it "logs an error if vote creation fails" do
      contest = create(:contest)
      participant = contest.participants.last
      
      allow_any_instance_of(Vote).to receive(:save!).and_raise(ActiveRecord::RecordInvalid)

      expect(Rails.logger).to receive(:error).with(/Failed to save vote:/)

      VoteJob.perform_now(contest.id, participant.id)
    end
  end
end
