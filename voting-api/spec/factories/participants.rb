FactoryBot.define do
  factory :participant do
    name { Faker::JapaneseMedia::OnePiece.character }
  end
end