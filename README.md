# About

Jar jar, here's the README.

# Technologies

## Frontend

- ~~Zepto~~ (removed and replaced with jQuery)
- jQuery: DOM manipulation
- Backbone
- Handlebars: Template engine

## Backend

- Ruby
- Sinatra
- DataMapper: ORM
- ~~Slim~~ (removed and replaced with plain, old, and boring ERB)
- Thin

# How to Run?

## Services

    cd services
    bundle install
    ruby app.rb

Then, open <http://localhost:4567>

If you prefer to use the Rack Adapter, just:

    cd services
    bundle install
    thin start

Then, open <http://localhost:3000> (notice the port)