FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password_digest { Faker::Internet.password }
    api_key { SecureRandom.hex(32) }
  end
end
