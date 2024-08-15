class AddContestToVotes < ActiveRecord::Migration[7.1]
  def change
    add_reference :votes, :contest, null: false, foreign_key: true
  end
end
