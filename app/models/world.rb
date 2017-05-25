class World
  include Mongoid::Document
  include Mongoid::Timestamps

  # relations
  belongs_to :user, optional: true

  field :country_list, type: Array

  # DO SOMETHING BEFORE CREATE -> to have all countries visited and put there on the map

  # Get list of all countries that user visit, and delete duplicata
  def get_all_countries_list
  	arr = []
  	self.user.travels.each do |travel|
  		travel.steps.each do |step|
  			arr.push(step.country)
  		end
  	end
  	arr.detect{ |e| arr.count(e) > 1 }
  end

end
