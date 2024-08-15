class Api::ParticipantsController < ApplicationController
  before_action :set_participant, only: [:destroy]

  def index
    render json: Participant.all
  end

  def create
    participant = Participant.new(participant_params)
    if participant.save
      render json: participant, status: :created
    else
      render json: { erros: participant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @participant.destroy
    head :no_content  
  end

  private

  def set_participant
    @participant = Participant.find(params[:id])
  end

  def participant_params
    params.require(:participant).permit(:name)
  end
end
