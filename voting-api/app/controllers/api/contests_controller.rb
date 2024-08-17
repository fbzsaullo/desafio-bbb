class Api::ContestsController < ApplicationController
  before_action :set_contest, only: [:show, :complete]
  before_action :set_actived_contest, only: [:actived, :actived_votes]

  before_action :authenticate, only: [:create, :complete]

  def index
    render json: Contest.all
  end

  def show
    render json: {
      contest: @contest,
      total_votes: @contest.total_votes,
      votes_by_participant: @contest.votes_by_participant
    }, status: :ok
  end

  def actived
    if @contest
      render json: @contest.active_contest_data, status: :ok
    else
      render json: { errors: 'No actived contest' }, status: :not_found
    end
  end

  def actived_votes
    if @contest
      render json: { participants: @contest.detailed_votes_by_participant }, status: :ok
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
