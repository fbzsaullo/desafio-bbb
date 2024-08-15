class ContestParticipant < ApplicationRecord
  belongs_to :contest
  belongs_to :participant
end
