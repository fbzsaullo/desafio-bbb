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

  def total_votes
    votes.count
  end

  def votes_by_participant
    participants.map do |participant|
      participant_total_votes = participant_votes(participant).count
      percentage = total_votes.zero? ? 0 : (participant_total_votes.to_f / total_votes) * 100
      {
        id: participant.id,
        name: participant.name,
        photo_url: participant.photo_url,
        percentage: percentage.round(2),
        total_votes: participant_total_votes
      }
    end
  end

  def detailed_votes_by_participant
    participants.map do |participant|
      {
        id: participant.id,
        name: participant.name,
        votes: participant_votes(participant).map do |vote|
          {
            id: vote.id,
            created_at: vote.created_at
          }
        end
      }
    end
  end

  def active_contest_data
    return nil unless active?

    {
      contest: self,
      total_votes: total_votes,
      participants: votes_by_participant
    }
  end

  def winner
    return nil if total_votes.zero?

    participants.max_by { |participant| participant_votes(participant).count }
  end

  def as_index_json
    {
      id: id,
      status: status,
      created_at: created_at,
      updated_at: updated_at,
      total_votes: total_votes,
      winner: winner ? {
        id: winner.id,
        name: winner.name,
        photo_url: winner.photo_url,
        total_votes: participant_votes(winner).count
      } : nil
    }
  end

  private

  def previous_contest_completed
    last_contest = Contest.order(created_at: :desc).first
    if last_contest && last_contest.active?
      errors.add(:base, "O último Contest ainda está ativo. Só é permitido criar um novo Contest quando o anterior estiver completed.")
    end
  end
end