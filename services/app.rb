require "bundler/setup"

require 'sinatra'
require "sinatra/json"

require 'data_mapper'
require "dm-sqlite-adapter"
require 'dm-serializer'

require 'slim'

enable :sessions

# ---
# - DataMapper configuration
# ---
DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite://#{Dir.pwd}/rs.db")
require_relative 'models/init'
DataMapper.auto_migrate!
DataMapper.finalize

# ---
# Views
# ---
set :public_dir, File.dirname(__FILE__) + '/public'
set :views, File.dirname(__FILE__) + '/templates'

# ---
get '/' do
  slim :index
end

# ---
# API REQUESTS
# ---
get '/selections' do
  Selection.all.to_json
end

get '/people' do
  Person.all.to_json
end

get '/person/:id' do
end

post '/person/:id' do
end