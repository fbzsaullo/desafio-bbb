class CreateContestParticipants < ActiveRecord::Migration[7.1]
  def change
    create_table :contest_participants do |t|
      t.references :contest, null: false, foreign_key: true
      t.references :participant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
