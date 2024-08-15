require 'rails_helper'

RSpec.describe Contest, type: :model do
  subject { build(:contest) }

  it { is_expected.to be_valid }

  context 'associations' do
    it 'can have many participants' do
      contest = create(:contest)
      participants = create_list(:participant, 3)
      contest.participants << participants

      expect(contest.participants).to match_array(participants)
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
end
