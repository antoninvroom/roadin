class User
  include Mongoid::Document
  include Mongoid::Timestamps

  # relations
  has_many :travels

  field :provider, type: String
  field :uid, type: String
  field :name, type: String
  field :picture, type: String
  field :auth_token, type: String


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

end
