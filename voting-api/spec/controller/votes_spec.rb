require 'rails_helper'

RSpec.describe Api::VotesController, type: :controller do
  before do
    Contest.all.update_all(status: 'completed')
    ActiveJob::Base.queue_adapter = :test
  end

  describe "POST #create" do
    let(:contest) { create(:contest) }
    let(:participant) { contest.participants.last }

    context "when reCAPTCHA is valid" do
      before do
        allow(RecaptchaService).to receive(:valid?).with(anything).and_return(true)
      end

      it "enqueues a VoteJob" do
        expect {
          post :create, params: { contest_id: contest.id, participant_id: participant.id, recaptchaToken: 'dummy_token' }
        }.to have_enqueued_job(VoteJob).with(contest.id, participant.id)
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)["message"]).to eq("Vote has been cast")
      end
    end

    context "when reCAPTCHA is invalid" do
      before do
        allow(RecaptchaService).to receive(:valid?).with(anything).and_return(false)
      end

      it "does not enqueue a VoteJob" do
        expect {
          post :create, params: { contest_id: contest.id, participant_id: participant.id, recaptchaToken: 'dummy_token' }
        }.not_to have_enqueued_job(VoteJob)
        expect(response).to have_http_status(422)
        expect(JSON.parse(response.body)["error"]).to eq("Invalid reCAPTCHA")
      end
    end
  end
end
