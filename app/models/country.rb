class Country
  include Mongoid::Document
  include Mongoid::Timestamps

  # fields
  field :name, type: String
  field :code, type: String
  field :flag, type: String

  # additionnal fields 
  # field :people, type: Integer
  # field :indice, type: Integer
end
