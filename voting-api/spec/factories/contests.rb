FactoryBot.define do
  factory :contest do
    after(:build) do |contest|
      participants_list = build_list(:participant, 3)
      participants_list.each do |participant|
        contest.participants << participant
      end
    end
  end
end
