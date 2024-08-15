# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_08_15_143922) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "contest_participants", force: :cascade do |t|
    t.bigint "contest_id", null: false
    t.bigint "participant_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contest_id"], name: "index_contest_participants_on_contest_id"
    t.index ["participant_id"], name: "index_contest_participants_on_participant_id"
  end

  create_table "contests", force: :cascade do |t|
    t.string "status", default: "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "participants", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "votes", force: :cascade do |t|
    t.bigint "participant_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "contest_id", null: false
    t.index ["contest_id"], name: "index_votes_on_contest_id"
    t.index ["participant_id"], name: "index_votes_on_participant_id"
  end

  add_foreign_key "contest_participants", "contests"
  add_foreign_key "contest_participants", "participants"
  add_foreign_key "votes", "contests"
  add_foreign_key "votes", "participants"
end
