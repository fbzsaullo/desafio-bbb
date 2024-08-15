class VoteJob < ApplicationJob
  queue_as :default

  def perform(contest_id, participant_id)
    contest = Contest.find(contest_id)
    participant = contest.participants.find(participant_id)
    
    vote = Vote.new(contest: contest, participant: participant)
    vote.save!
  rescue => e
    Rails.logger.error "Failed to save vote: #{e.message}"
  end
end
