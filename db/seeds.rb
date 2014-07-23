Task.delete_all

12.times do |i|
  task = Task.create!(task: "Task #{i}")
  puts "Created task #{task}"
end
