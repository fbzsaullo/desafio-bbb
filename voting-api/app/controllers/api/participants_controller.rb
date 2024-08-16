class Api::ParticipantsController < ApplicationController
  before_action :authorize_request, only: [:create]

  def index
    render json: Participant.all.as_json(methods: :photo_url)
  end

  def create
    @participant = Participant.new(participant_params)
    attach_photo(@participant) if attach_photo?
    if @participant.save
      render json: @participant.as_json(methods: :photo_url), status: :created
    else
      render json: { erros: @participant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def participant_params
    params.require(:participant).permit(:name)
  end

  def photo_params
    params.require(:participant).permit(:photo_base64)
  end

  def attach_photo?
    photo_params[:photo_base64].present?
  end

  def attach_photo(participant)
    io = StringIO.new(Base64.decode64(photo_params[:photo_base64]))
    filename = "#{participant.name}_#{Time.now.to_i}.jpg"
    participant.photo.attach(io: io, filename: filename, content_type: 'image/jpg')
  end
end
