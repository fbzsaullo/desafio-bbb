require 'rails_helper'

RSpec.describe Contest, type: :model do
  subject { build(:contest) }

  it { is_expected.to be_valid }

  context 'associations' do
    it 'can have many participants' do
      contest = create(:contest)
      contest.participants.count < 2 if contest.participants << create(:participant)

      expect(contest.participants.count).to be > 2
    end
  end

  context 'aasm states' do
    it 'initial state is pending' do
      expect(subject.status).to eq('pending')
    end

    it 'transitions from pending to active' do
      subject.start
      expect(subject.status).to eq('active')
    end

    it 'transitions from active to completed' do
      subject.start
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
end
