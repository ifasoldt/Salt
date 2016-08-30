require "refile"
Refile.configure do |config|
  connection = lambda { |&blk| ActiveRecord::Base.connection_pool.with_connection { |con| blk.call(con.raw_connection) } }
  config.store = Refile::Postgres::Backend.new(connection)
end

if Rails.env.development?
  Refile.cdn_host = 'http://localhost:3000'
else
  Refile.cdn_host = 'https://infinite-cove-48463.herokuapp.com'
end
