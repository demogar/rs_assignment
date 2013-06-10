# About

jar jar, here's the README.

# Technologies

## Frontend

- jQuery
- Backbone
- Handlebars

## Backend

- Ruby
- Sinatra
- DataMapper (ORM)
- ~~Slim~~ (removed and replaced by plain, old, and boring ERB)

# How to Run?

## Services

    cd /services
    bundle install
    ruby app.rb

Then, open <http://localhost:4567>

If you prefer to use the Rack Adapter, just:

    cd /services
    bundle install
    thin start

Then, open <http://localhost:3000> (notice the port)