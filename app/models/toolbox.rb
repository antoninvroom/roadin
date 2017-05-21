class Toolbox
  include Mongoid::Document
  include Mongoid::Timestamps

  # fields
  field :tool_area, type: String
  field :links, type: Array

  # step
  belongs_to :step, optional: true


end
