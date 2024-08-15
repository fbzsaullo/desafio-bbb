module Api
  class VotesController < ApplicationController
    before_action :set_contest
    before_action :set_participant, only: [:create]

    def create
      vote = Vote.new(contest: @contest, participant: @participant)
      
      if vote.save
        render json: vote, status: :created
      else
        render json: { errors: vote.errors.full_messages }, status: :unprocessable_entity
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
end
