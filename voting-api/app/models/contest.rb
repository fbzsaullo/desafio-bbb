class Contest < ApplicationRecord
  include AASM

  aasm column: 'status' do
    state :active, initial: true
    state :completed

    event :complete do
      transitions from: :active, to: :completed
    end
  end

  has_many :contest_participants
  has_many :participants, through: :contest_participants
  has_many :votes

  validates :participants, presence: true
  validate :previous_contest_completed, on: :create

  def participant_votes(participant)
    votes.where(participant: participant)
  end

  private

  def previous_contest_completed
    last_contest = Contest.order(created_at: :desc).first
    if last_contest && last_contest.active?
      errors.add(:base, "O último Contest ainda está ativo. Só é permitido criar um novo Contest quando o anterior estiver completed.")
    end
  end
end