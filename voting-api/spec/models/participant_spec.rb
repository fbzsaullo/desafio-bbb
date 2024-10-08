require 'rails_helper'

RSpec.describe Participant, type: :model do
  subject { build(:participant) }
  
  before do
    Contest.all.update_all(status: 'completed')
  end

  context "validations" do
    it { is_expected.to be_valid }

    it "is invalid without a name" do
      subject.name = nil
      is_expected.to_not be_valid
    end
  end

  context "associations" do
    it "can have many votes" do
      contest = create(:contest)
      participant = contest.participants.last
      create_list(:vote, 2, participant: participant, contest: contest)

      expect(participant.votes.size).to eq(2)
    end

    it 'can have many contest_participants' do
      participant = create(:participant)
      contest_participant = create(:contest_participant, participant: participant)

      expect(participant.contest_participants).to include(contest_participant)
    end

    it 'can have many contests through contest_participants' do
      participant = create(:participant)
      contest = create(:contest)
      participant.contests << contest

      expect(participant.contests).to include(contest)
    end
  end

  context "photo" do
    it 'can attach a photo' do
      photo = Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/files/test_image.jpg'), 'image/jpg')
      participant = create(:participant, photo: photo)

      expect(participant.photo).to be_attached
    end

    it 'returns the photo URL' do
      photo = Rack::Test::UploadedFile.new(Rails.root.join('spec/fixtures/files/test_image.jpg'), 'image/jpg')
      participant = create(:participant, photo: photo)

      expect(participant.photo_url).to be_present
    end
  end
end
