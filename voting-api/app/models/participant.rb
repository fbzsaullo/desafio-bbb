class Participant < ApplicationRecord
  has_many :votes
  has_many :contest_participants
  has_many :contests, through: :contest_participants

  has_one_attached :photo
  
  validates :name, presence: true

  def photo_url
    photo.attached? ? Rails.application.routes.url_helpers.rails_blob_url(photo, only_path: true) : nil
  end
end
