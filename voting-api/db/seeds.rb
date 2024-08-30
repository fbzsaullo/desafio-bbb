# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

# participants.each do |p|
#   (0..11).each do |i|
#     votes = rand(10..50)
#     votes.times do
#       Vote.create!(
#         participant_id: p.id,
#         contest_id:contest.id,
#         created_at: i.hours.ago,
#         updated_at: i.hours.ago,
#       )
#     end
#   end
# end
