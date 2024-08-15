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
end