class Item
  include Mongoid::Document
  include Mongoid::Timestamps

  # fields
  field :type, type: String
  field :title, type: String
  field :trick, type: String
  field :address, type: String
  field :url, type: String

  # relations
  embedded_in :toolbox, :inverse_of => :items

end
