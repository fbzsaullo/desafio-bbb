FactoryBot.define do
  factory :contest do
    participants { [create(:participant), create(:participant)] }
  end
end
