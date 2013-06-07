require "bundler/setup"

require 'sinatra'
require "sinatra/json"

require 'data_mapper'
require "dm-sqlite-adapter"
require 'dm-serializer'

# require 'slim'

enable :sessions

# ---
# - DataMapper configuration
# ---
DataMapper.setup(:default, ENV['DATABASE_URL'] || "sqlite://#{Dir.pwd}/rs.db")
require_relative 'models/init'
DataMapper.finalize

# ---
# Views
# ---
set :public_dir, File.dirname(__FILE__) + '/public'
set :views, File.dirname(__FILE__) + '/templates'

# ---
get '/' do
  erb :index
end

# ---
# API REQUESTS
# ---
get '/selections' do
  content_type :json
  Selection.all.to_json
end

get '/people' do
  content_type :json
  Person.all().to_json(:methods => [:selection])
end

post '/people' do
  content_type :json

  @request_body = JSON.parse(request.body.read.to_s)
  @name = @request_body["name"]

  @person = Person.new
  @person.name = @name
  @person.created_at = Time.now

  if @person.save
    return @person.to_json(:methods => [:selection])
  else
    return json :error => 'true', :msg => @person.errors.to_s
  end
end

get '/people/:id' do
  content_type :json
  Person.get(params[:id].to_i).to_json(:methods => [:selection])
end

put '/people/:id' do
  content_type :json
  data = JSON.parse(request.body.read)
  @person = Person.first_or_create(:id => params[:id].to_i).update(:selection_id => data["selection_id"].to_i)

  Person.get(params[:id].to_i).to_json(:methods => [:selection])
end