# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160812174022) do

  create_table "buildings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "time_zone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "readings", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.integer  "room_id"
    t.datetime "recorded_at"
    t.float    "temperature", limit: 24
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.float    "sound",       limit: 24
    t.float    "co2",         limit: 24
    t.index ["room_id"], name: "index_readings_on_room_id", using: :btree
  end

  create_table "room_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "code"
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "rooms", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string   "name"
    t.string   "code",                           null: false
    t.string   "description"
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.float    "average_temperature", limit: 24
    t.float    "average_sound",       limit: 24
    t.float    "average_co2",         limit: 24
    t.integer  "building_id"
    t.integer  "room_type_id"
    t.index ["building_id"], name: "index_rooms_on_building_id", using: :btree
    t.index ["room_type_id"], name: "index_rooms_on_room_type_id", using: :btree
  end

  add_foreign_key "readings", "rooms"
  add_foreign_key "rooms", "buildings"
  add_foreign_key "rooms", "room_types"
end
