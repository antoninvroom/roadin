class World
  include Mongoid::Document
  include Mongoid::Timestamps

  # relations
  belongs_to :user, optional: true

  # Get list of all countries that user visit, and delete duplicata
  def get_all_countries_list
  	self.user.travels.each do |travel|
  		travel.steps.each do |step|
        return step.country
  		end
  	end
  end
end
