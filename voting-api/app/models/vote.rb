class Vote < ApplicationRecord
  belongs_to :participant
  belongs_to :contest

  validates :participant, presence: true
  validates :contest, presence: true
end
