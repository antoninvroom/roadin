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
  field :budget, type: Integer

  # steps
  embeds_many :steps
  accepts_nested_attributes_for :steps

  def display_budget
    return "#{self.budget} €"
  end

  def avg_per_steps
    if self.steps.count != 0
      avg = self.budget / self.steps.count
    end
  end

end
