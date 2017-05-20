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

  # Budget methods

  def display_budget
    return "#{self.budget} €"
  end

  def avg_per_steps
    if self.steps.count != 0
      avg = self.budget / self.steps.count
    end
  end

  # Times methods

  def total_step_time
    count = 0
    self.steps.each do |step|
      count = count + step.time_to_stay
    end
    return count
  end

  def time_for_travel
    time = (self.end_date - self.begin_date).to_i
    return time
  end

  def time_respect?
    if self.total_step_time > self.time_for_travel
      return false
    else
      return true
    end
  end

  def time_more_less
    if self.total_step_time > self.time_for_travel
      diff = self.total_step_time - self.time_for_travel
      return diff
    else
      diff = self.time_for_travel - self.total_step_time
      return diff
    end
  end

end
