class Toolbox
  include Mongoid::Document
  include Mongoid::Timestamps
  include Geocoder::Model::Mongoid

  # fields
  field :tool_area, type: String
  field :links, type: Array
  
  # step
  belongs_to :step


end
