class ParticipantSerializer < ActiveModel::Serializer
  attributes :id, :name, :photo_url, :created_at
end
