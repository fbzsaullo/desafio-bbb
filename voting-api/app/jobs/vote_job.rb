class VoteJob < ApplicationJob
  queue_as :default

  def perform(contest_id, participant_id)
    contest = find_contest(contest_id)
    participant = find_participant(contest, participant_id)
    create_vote(contest, participant)
  rescue => e
    handle_error(e)
  end

  private

  def find_contest(contest_id)
    Contest.find(contest_id)
  end

  def find_participant(contest, participant_id)
    contest.participants.find(participant_id)
  end

  def create_vote(contest, participant)
    vote = Vote.new(contest: contest, participant: participant)
    vote.save!
  end

  def handle_error(error)
    Rails.logger.error "Failed to save vote: #{error.message}"
  end
end
