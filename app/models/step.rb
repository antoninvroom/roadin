class Step
  include Mongoid::Document
  include Mongoid::Timestamps
  include Geocoder::Model::Mongoid

  # fields
  field :place, type: String
  field :country, type: ISO3166::Country
  field :plane, type: Boolean, default: false
  field :car, type: Boolean, default: false
  field :foot, type: Boolean, default: false
  field :train, type: Boolean, default: false
  field :cycle, type: Boolean, default: false
  field :boat, type: Boolean, default: false
  field :time_to_stay, type: Integer
  field :step_description, type: String
  field :coordinates, :type => Array
  field :advises, type: Array, default: []

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
  belongs_to :travel

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
