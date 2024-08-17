require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it 'validates presence of email' do
      user = User.new(email: nil, password: 'password')
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include("can't be blank")
    end

    it 'validates uniqueness of email' do
      User.create!(email: 'test@example.com', password: 'password')
      user = User.new(email: 'test@example.com', password: 'password')
      expect(user).not_to be_valid
      expect(user.errors[:email]).to include('has already been taken')
    end

    it 'validates presence of password' do
      user = User.new(email: 'test@example.com', password: nil)
      expect(user).not_to be_valid
      expect(user.errors[:password]).to include("can't be blank")
    end
  end

  describe 'authentication' do
    it 'authenticates with a valid password' do
      user = User.create!(email: 'test@example.com', password: 'password')
      expect(user.authenticate('password')).to be_truthy
    end

    it 'does not authenticate with an invalid password' do
      user = User.create!(email: 'test@example.com', password: 'password')
      expect(user.authenticate('wrong_password')).to be_falsey
    end
  end
end
