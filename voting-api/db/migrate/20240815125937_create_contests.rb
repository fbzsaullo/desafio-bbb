class CreateContests < ActiveRecord::Migration[7.1]
  def change
    create_table :contests do |t|
      t.string :status, default: 'active'

      t.timestamps
    end
  end
end
