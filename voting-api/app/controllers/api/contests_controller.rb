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
        participant_photo_url: participant.photo_url,
        percentage: percentage,
        total_votes: participant_total_votes
      }
    end

    render json: {
      contest: @contest,
      total_votes: total_votes,
      votes_by_participant: votes_by_participant
  }, status: :ok
  end

  def actived
    contest = Contest.where(status: 'active').last
    if contest
      render json: {
        contest: contest,
        participants: contest&.participants.as_json(methods: :photo_url)
      }
    else
      render json: { errors: 'No actived contest' }, status: :not_found
    end
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
  rescue AASM::InvalidTransition => e
    render json: { errors: e.message }, status: :unprocessable_entity
  end

  private

  def set_contest
    @contest = Contest.find(params[:id])
  end

  def contest_params
    params.require(:contest).permit(participant_ids: [])
  end
end