FactoryBot.define do
  factory :vote do
    contest
    participant { association :participant }
  end
end