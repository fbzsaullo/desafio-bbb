start:
	docker-compose up

build:
	docker-compose build

test:
	docker-compose run web bundle exec rspec

# make specific_test FILE=/app/spec/models/match_spec.rb
specific_test:
	docker-compose run web bundle exec rspec $(FILE)

console:
	docker-compose run web rails console

migration:
	docker-compose run web bundle exec rails db:drop db:create db:migrate

seed:
  docker-compose run web bundle exec rails db:seed