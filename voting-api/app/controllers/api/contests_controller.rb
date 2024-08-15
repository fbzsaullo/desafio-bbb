class Api::ContestsController < ApplicationController
  before_action :set_contest, only: [:show, :complete]

  def index
    render json: Contest.all
  end

  def show
    total_votes = @contest.votes.count
    votes_by_participant = @contest.participants.map do |participant|
      participant_total_votes = @contest.votes.where(participant: participant).count
      percentage = total_votes.zero? ? 0 : (participant_total_votes.to_f / total_votes) * 100
      {
        participant_id: participant.id,
        participant_name: participant.name,
        percentage: percentage,
        total_votes: participant_total_votes
      }
    end

    render json: {
      contest: @contest,
      total_votes: total_votes,
      votes_by_participant: votes_by_participant
  }
  end

  def create
    contest = Contest.new(contest_params)
    if contest.save
      render json: contest, status: :created
    else
      render json: { errors: contest.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def complete
    if @contest.complete!
      render json: @contest
    else
      render json: { errors: @contest.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_contest
    @contest = Contest.find(params[:id])
  end

  def contest_params
    params.require(:contest).permit(participant_ids: [])
  end
end