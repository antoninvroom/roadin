class Travel
  include Mongoid::Document
  include Mongoid::Timestamps

  # relations
  belongs_to :user

  # fields
  field :title, type: String
  field :description, type: String
  field :begin_date, type: String
  field :end_date, type: String

  # steps
  embeds_many :steps
  accepts_nested_attributes_for :steps

end
