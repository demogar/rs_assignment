class Selection
  include DataMapper::Resource

  property :id, Serial
  property :value, String

  has n, :people
end

class Person
  include DataMapper::Resource

  property :id, Serial
  property :name, String
  property :created_at, DateTime

  belongs_to :selection, :model => Selection
end