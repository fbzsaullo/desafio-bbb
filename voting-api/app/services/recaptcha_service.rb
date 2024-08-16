require 'net/http'
require 'json'

class RecaptchaService
  def self.valid?(response_token)
    uri = URI('https://www.google.com/recaptcha/api/siteverify')
    res = Net::HTTP.post_form(uri, {
      'secret' => ENV['RECAPTCHA_SECRET_KEY'],
      'response' => response_token
    })
    json_response = JSON.parse(res.body)
    json_response['success']
  end
end
