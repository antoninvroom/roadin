class Step
  include Mongoid::Document
  include Mongoid::Timestamps
  include Geocoder::Model::Mongoid

  # fields
  field :place, type: String
  field :time_to_stay, type: Integer
  field :step_description, type: String
  field :coordinates, :type => Array

  # url

  def step_namespace
    return self.place.gsub(' ','-').downcase
  end

  # method adress
  def address
    return "#{self.place}"
  end

  # Geocoder
  geocoded_by :address
  after_validation :geocode

  # steps
  embedded_in :travel, :inverse_of => :steps

  # toolbox
  has_one :toolbox
  accepts_nested_attributes_for :toolbox

  # methods
  def step_name
    return "Step - #{self.place}"
  end

  def step_duration
    if self.time_to_stay < 30
      return "#{self.time_to_stay} days"
    else
      month = self.time_to_stay / 30
      return "#{month} months"
    end
  end

end
