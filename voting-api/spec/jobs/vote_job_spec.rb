# spec/jobs/vote_job_spec.rb

require 'rails_helper'

RSpec.describe VoteJob, type: :job do
  let!(:contest) { create(:contest) }
  let!(:participant) { create(:participant) }
  let!(:contest_participant) { create(:contest_participant, contest: contest, participant: participant) }

  describe "#perform" do
    it "creates a new vote" do
      expect {
        VoteJob.perform_now(contest.id, participant.id)
      }.to change(Vote, :count).by(1)
    end

    it "logs an error if vote creation fails" do
      allow_any_instance_of(Vote).to receive(:save!).and_raise(ActiveRecord::RecordInvalid)

      expect(Rails.logger).to receive(:error).with(/Failed to save vote:/)

      VoteJob.perform_now(contest.id, participant.id)
    end
  end
end
