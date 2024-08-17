require 'rails_helper'

RSpec.describe Contest, type: :model do
  subject { build(:contest) }
  
  before do
    Contest.all.update_all(status: 'completed')
  end

  context 'validations' do
    it { is_expected.to be_valid }

    it "does not allow creating a contest if the previous one is still active" do
      create(:contest, status: 'active')
      new_contest = build(:contest)
  
      expect(new_contest).not_to be_valid
      expect(new_contest.errors[:base]).to include("O último Contest ainda está ativo. Só é permitido criar um novo Contest quando o anterior estiver completed.")
    end
  end

  context 'associations' do
    it 'can have many participants' do
      contest = create(:contest)
      contest.participants.count < 2 if contest.participants << create(:participant)

      expect(contest.participants.count).to be > 2
    end
  end

  context 'aasm states' do
    it 'initial state is active' do
      expect(subject.status).to eq('active')
    end

    it 'transitions from active to completed' do
      subject.complete
      expect(subject.status).to eq('completed')
    end
  end

  describe '#participant_votes' do
    it 'returns the votes for a specific participant' do
      contest = create(:contest)
      participant = create(:participant)
      vote = create(:vote, contest: contest, participant: participant)
      create(:vote, contest: contest)

      expect(contest.participant_votes(participant)).to contain_exactly(vote)
    end
  end

  describe '#total_votes' do
    it 'returns the total number of votes for the contest' do
      contest = create(:contest)
      create_list(:vote, 5, contest: contest)

      expect(contest.total_votes).to eq(5)
    end
  end

  describe '#votes_by_participant' do
    it 'returns a list of participants with their vote counts and percentages' do
      contest = create(:contest)
      participant1 = contest.participants.first
      participant2 = contest.participants.second
      create_list(:vote, 3, contest: contest, participant: participant1)
      create_list(:vote, 2, contest: contest, participant: participant2)

      votes_by_participant = contest.votes_by_participant

      expect(votes_by_participant).to include(
        hash_including(id: participant1.id, name: participant1.name, total_votes: 3),
        hash_including(id: participant2.id, name: participant2.name, total_votes: 2)
      )
    end
  end

  describe '#detailed_votes_by_participant' do
    it 'returns a list of participants with detailed vote data' do
      contest = create(:contest)
      participant = contest.participants.first
      vote = create(:vote, contest: contest, participant: participant)

      detailed_votes = contest.detailed_votes_by_participant

      expect(detailed_votes).to include(
        hash_including(id: participant.id, name: participant.name, votes: [hash_including(id: vote.id)])
      )
    end
  end

  describe '#active_contest_data' do
    it 'returns contest data including votes by participant for active contests' do
      contest = create(:contest)
      participant = contest.participants.first
      create_list(:vote, 2, contest: contest, participant: participant)

      data = contest.active_contest_data

      expect(data[:total_votes]).to eq(2)
      expect(data[:participants].first[:total_votes]).to eq(2)
    end

    it 'returns nil if the contest is not active' do
      contest = create(:contest, status: 'completed')

      expect(contest.active_contest_data).to be_nil
    end
  end

  describe '#winner' do
    it 'returns the participant with the most votes' do
      contest = create(:contest)
      participant1 = contest.participants.first
      participant2 = contest.participants.second
      create_list(:vote, 3, contest: contest, participant: participant1)
      create_list(:vote, 2, contest: contest, participant: participant2)

      expect(contest.winner).to eq(participant1)
    end

    it 'returns nil if there are no votes' do
      contest = create(:contest)

      expect(contest.winner).to be_nil
    end
  end

  describe '#as_index_json' do
    it 'returns the contest data in the expected JSON format' do
      contest = create(:contest)
      participant1 = contest.participants.first
      participant2 = contest.participants.second
      create_list(:vote, 3, contest: contest, participant: participant1)
      create_list(:vote, 2, contest: contest, participant: participant2)

      expected_json = {
        id: contest.id,
        status: contest.status,
        created_at: contest.created_at,
        updated_at: contest.updated_at,
        total_votes: contest.total_votes,
        winner: {
          id: participant1.id,
          name: participant1.name,
          photo_url: participant1.photo_url,
          total_votes: 3
        }
      }

      expect(contest.as_index_json).to eq(expected_json)
    end

    it 'returns nil for the winner if there are no votes' do
      contest = create(:contest)

      expected_json = {
        id: contest.id,
        status: contest.status,
        created_at: contest.created_at,
        updated_at: contest.updated_at,
        total_votes: 0,
        winner: nil
      }

      expect(contest.as_index_json).to eq(expected_json)
    end
  end
end
