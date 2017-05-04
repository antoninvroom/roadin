require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Roadin
  class Application < Rails::Application
    config.assets.enabled = true
    config.assets.paths << "#{Rails.root}/app/assets/fonts"
  end
end
