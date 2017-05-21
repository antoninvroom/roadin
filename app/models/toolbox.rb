class Toolbox
  include Mongoid::Document
  include Mongoid::Timestamps
  include Geocoder::Model::Mongoid

  # fields
  field :tool_area, type: String
  field :links, type: Array


  # step
  embedded_in :step, :inverse_of => :toolbox

end
