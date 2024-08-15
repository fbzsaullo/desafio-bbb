class Contest < ApplicationRecord
  include AASM

  aasm column: 'status' do
    state :pending, initial: true
    state :active
    state :completed

    event :start do
      transitions from: :pending, to: :active
    end

    event :complete do
      transitions from: :active, to: :completed
    end
  end

  has_many :contest_participants
  has_many :participants, through: :contest_participants
  has_many :votes

  validates :participants, presence: true

  def participant_votes(participant)
    votes.where(participant: participant)
  end
end