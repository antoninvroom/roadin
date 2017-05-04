class Step
  include Mongoid::Document
  include Mongoid::Timestamps

  # fields
  field :country, type: String
  field :city, type: String
  field :time_to_stay, type: String
  field :step_description, type: String

  # steps
  embedded_in :travel

  # methods
  def step_name
    return "Step - #{self.city}, #{self.country}"
  end

end
