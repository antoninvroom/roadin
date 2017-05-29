class Participant
  include Mongoid::Document
  include Mongoid::Timestamps

  field :name, type: String
  field :user_id, type: String

  # relations
  embedded_in :travel, :inverse_of => :participants

end
