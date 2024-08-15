# Select the base image (app ruby version)
FROM ruby:3.1.2

# Install the necessary dependencies
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# Set the working directory in the container
WORKDIR /app

# Copy the Gemfile and Gemfile.lock files into the container
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy the application code into the container
COPY . .

# Expose the port that the app runs in
EXPOSE 3000

# Start the application
CMD ["rails", "server", "-b", "0.0.0.0"]
