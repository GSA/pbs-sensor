# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

RoomType.create([
  {code: "unknown", name: "Unknown"},
  {code: "conference", name: "Conference Room"},
  {code: "open", name: "Open Workspace"},
  {code: "focus", name: "Focus Room"},
  {code: "kitchen", name: "Kitchen"},
  {code: "lobby", name: "Lobby"},
  {code: "cubicle", name: "Cubicle"},
  {code: "private-office", name: "Private Office"},
  {code: "printer", name: "Printer Room"},
])
