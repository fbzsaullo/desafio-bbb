require 'rails_helper'

RSpec.describe Participant, type: :model do
  subject { build(:participant) }

  context "validations" do
    it { is_expected.to be_valid }

    it "is invalid without a name" do
      subject.name = nil
      is_expected.to_not be_valid
    end
  end

  context "associations" do
    it "can have many votes" do
      participant = create(:participant)
      create_list(:vote, 2, participant: participant)

      expect(participant.votes.size).to eq(2)
    end
  end
end
