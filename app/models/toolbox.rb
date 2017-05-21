class Toolbox
  include Mongoid::Document
  include Mongoid::Timestamps
  # step
  belongs_to :step, optional: true

  # items
  embeds_many :items
  accepts_nested_attributes_for :items


end
