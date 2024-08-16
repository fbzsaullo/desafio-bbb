class Api::VotesController < ApplicationController
  before_action :set_contest
  before_action :set_participant, only: [:create]

  def create
    recaptcha_response = params[:recaptchaToken]
    if RecaptchaService.valid?(recaptcha_response)
      VoteJob.perform_later(@contest.id, @participant.id)
      render json: { message: "Vote has been cast" }, status: :ok
    else
      render json: { error: "Invalid reCAPTCHA" }, status: :unprocessable_entity
    end
  end

  private

  def set_contest
    @contest = Contest.find(params[:contest_id])
  end

  def set_participant
    @participant = @contest.participants.find(params[:participant_id])
  end

end
