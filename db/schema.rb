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

ActiveRecord::Schema.define(version: 20160819152106) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "addresses", force: :cascade do |t|
    t.string   "street"
    t.string   "city"
    t.string   "state"
    t.string   "zip"
    t.string   "addressable_type"
    t.integer  "addressable_id"
    t.datetime "created_at",                                null: false
    t.datetime "updated_at",                                null: false
    t.decimal  "lat",              precision: 10, scale: 6
    t.decimal  "lng",              precision: 10, scale: 6
    t.index ["addressable_type", "addressable_id"], name: "index_addresses_on_addressable_type_and_addressable_id", using: :btree
  end

  create_table "applications", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "event_id"
    t.integer  "quantity"
    t.text     "message"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "status"
  end

  create_table "events", force: :cascade do |t|
    t.integer  "host_id"
    t.text     "description"
    t.text     "food"
    t.integer  "guest_limit"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.date     "date"
    t.string   "title"
    t.boolean  "allow_children"
    t.boolean  "alcohol_allowed"
    t.boolean  "unlimited_guests"
    t.time     "time"
    t.boolean  "filter_guests"
  end

  create_table "images", force: :cascade do |t|
    t.string   "file_id"
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "portfolio", force: :cascade do |t|
    t.string  "title"
    t.text    "description"
    t.string  "repo"
    t.date    "date"
    t.string  "image"
    t.integer "display_order"
    t.string  "image_second"
    t.boolean "featured"
  end

  create_table "refile_attachments", force: :cascade do |t|
    t.integer  "oid",        null: false
    t.string   "namespace",  null: false
    t.datetime "created_at"
    t.index ["namespace"], name: "index_refile_attachments_on_namespace", using: :btree
    t.index ["oid"], name: "index_refile_attachments_on_oid", using: :btree
  end

  create_table "thumbs", force: :cascade do |t|
    t.integer  "host_id"
    t.integer  "user_id"
    t.integer  "event_id"
    t.string   "category"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password_digest"
    t.string   "phone"
    t.text     "description"
    t.string   "location"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.date     "date_of_birth"
  end

  create_table "w5d2", force: :cascade do |t|
    t.string   "film",       limit: 255
    t.string   "stars",      limit: 255
    t.string   "rating",     limit: 255
    t.string   "votes",      limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
