class Item
  include Mongoid::Document
  include Mongoid::Timestamps

  # fields
  field :type, type: String
  field :title, type: String
  field :trick, type: String
  field :address, type: String, default: ""
  field :url, type: String, default: ""
  field :advise, type: Boolean

  # relations
  embedded_in :toolbox, :inverse_of => :items

  # methods
  def is_advised?
    if self.advise
      return true
    else
      return false
    end
  end

end
