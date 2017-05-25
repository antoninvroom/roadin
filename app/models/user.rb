class User
  include Mongoid::Document
  include Mongoid::Timestamps

  # relations
  has_many :travels
  has_one :world

  field :provider, type: String
  field :uid, type: String
  field :name, type: String
  field :picture, type: String
  field :auth_token, type: String

  def user_namespace
    return self.name.gsub(' ', '-').downcase
  end

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      user.auth_token = auth['credentials']['token']
      if auth['info']
        user.name = auth['info']['name'] || ""
        user.picture = auth['info']['image'] || ""
      end
    end
  end

  def large_image
    return "http://graph.facebook.com/#{self.uid}/picture?type=large"
  end

  def normal_image
    return "http://graph.facebook.com/#{self.uid}/picture?type=normal"
  end

  def friend_list
    facebook {|fb| fb.get_connection("me", "friends")}.each do |hash|
      self.friends.where()
    end
  end

  def number_steps
    count = 0
    self.travels.each do |travel|
      counter_step = travel.steps.count
      count = count + counter_step
    end
    return count
  end

  def total_time_of_travel
    count = 0
    self.travels.each do |travel|
      counter_time = travel.time_for_travel
      count = count + counter_time
    end
    return count
  end

  def total_toolboxes
    count = 0
    self.travels.each do |travel|
      travel.steps.each do |step|
        if step.toolbox 
          count = count + 1
        end
      end
    end
    return count
  end

end
