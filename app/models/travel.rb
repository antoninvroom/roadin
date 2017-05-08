class Travel
  include Mongoid::Document
  include Mongoid::Timestamps

  # relations
  belongs_to :user

  # fields
  field :title, type: String
  field :description, type: String
  field :begin_date, type: Date
  field :end_date, type: Date

  # steps
  embeds_many :steps
  accepts_nested_attributes_for :steps

end
