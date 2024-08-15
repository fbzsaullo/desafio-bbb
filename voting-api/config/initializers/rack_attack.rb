# config/initializers/rack_attack.rb

class Rack::Attack
  # TODO: Block requests from bad user agents (VOTES)
  # throttle('votes/ip', limit: 5, period: 1.second) do |req|
  #   if req.path == '/api/vote' && req.post?
  #     req.ip
  #   end
  # end

  # blocklist('block bad user agents') do |req|
  #   req.path == '/api/vote' && req.user_agent =~ /BadBot/i
  # end
end
