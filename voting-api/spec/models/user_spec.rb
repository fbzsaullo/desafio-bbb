require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'callbacks' do
    it 'generates an api_key before creating a user' do
      user = User.new(email: Faker::Internet.email, password: Faker::Internet.password)
      expect(user.api_key).to be_nil
      user.save
      expect(user.api_key).not_to be_nil
    end
  end
end
