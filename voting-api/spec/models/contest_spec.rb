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
end
