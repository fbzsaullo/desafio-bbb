class Api::ContestsController < ApplicationController
  before_action :set_contest, only: [:show, :complete]
  before_action :set_actived_contest, only: [:actived, :actived_votes]

  before_action :authorize_request, only: [:create, :complete]

  def index
    render json: Contest.all
  end

  def show
    total_votes = @contest.votes.count
    votes_by_participant = @contest.participants.map do |participant|
      participant_total_votes = @contest.votes.where(participant: participant).count
      percentage = total_votes.zero? ? 0 : (participant_total_votes.to_f / total_votes) * 100
      {
        id: participant.id,
        name: participant.name,
        photo_url: participant.photo_url,
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
    if @contest
      total_votes = @contest.votes.count
      votes_by_participant = @contest.participants.map do |participant|
        participant_total_votes = @contest.votes.where(participant: participant).count
        percentage = total_votes.zero? ? 0 : (participant_total_votes.to_f / total_votes) * 100
        {
          id: participant.id,
          name: participant.name,
          photo_url: participant.photo_url,
          percentage: percentage.round(2),
          total_votes: participant_total_votes
        }
      end

      render json: {
        contest: @contest,
        total_votes: total_votes,
        participants: votes_by_participant
      }, status: :ok
    else
      render json: { errors: 'No actived contest' }, status: :not_found
    end
  end

  def actived_votes
    if @contest
      participants = @contest.participants.map do |participant|
        {
          id: participant.id,
          name: participant.name,
          votes: @contest.votes.where(participant_id: participant.id).map do |vote|
            {
              id: vote.id,
              created_at: vote.created_at
            }
          end
        }
      end
  
      render json: { participants: participants }, status: :ok
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

  def set_actived_contest
    @contest = Contest.where(status: 'active').last
  end

  def set_contest
    @contest = Contest.find(params[:id])
  end

  def contest_params
    params.require(:contest).permit(participant_ids: [])
  end
end