class Participant < ApplicationRecord
  has_many :votes
  has_many :contest_participants
  has_many :contests, through: :contest_participants
  
  validates :name, presence: true
end
