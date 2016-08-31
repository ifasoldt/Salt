desc "This task is called by the Heroku scheduler add-on"
task :update_app_statuses => :environment do
  puts "Updating Application Statuses"
  Event.update_application_statuses
  puts "done."
end
