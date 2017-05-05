class Step
  include Mongoid::Document
  include Mongoid::Timestamps
  include Geocoder::Model::Mongoid

  # fields
  field :country, type: String
  field :city, type: String
  field :time_to_stay, type: String
  field :step_description, type: String
  field :coordinates, :type => Array
  field :address

  # steps
  embedded_in :travel

  # Geocoder
  geocoded_by :address
  after_validation :geocode

  # methods
  def step_name
    return "Step - #{self.city}, #{self.country}"
  end

end
