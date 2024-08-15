require 'rails_helper'

RSpec.describe ContestParticipant, type: :model do
  subject { build(:contest_participant) }

  context "validations" do
    it { is_expected.to be_valid }

    it "is invalid without a contest" do
      subject.contest = nil
      is_expected.to_not be_valid
    end

    it "is invalid without a participant" do
      subject.participant = nil
      is_expected.to_not be_valid
    end
  end

  context "associations" do
    it "belongs to a contest" do
      association = described_class.reflect_on_association(:contest)
      expect(association.macro).to eq(:belongs_to)
    end

    it "belongs to a participant" do
      association = described_class.reflect_on_association(:participant)
      expect(association.macro).to eq(:belongs_to)
    end
  end
end
