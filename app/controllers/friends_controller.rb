class FriendsController < ApplicationController
  def index
    @user_fb_token = current_user.auth_token
    unless @user_fb_token.blank?
      @fb_friends = FbGraph2::User.me(@user_fb_token).friends
      @fb_friends = @fb_friends.sort_by { |fb_frnd| fb_frnd.raw_attributes['name']}
      ids = @fb_friends.map {|s| s.id}
      @friends = User.where(:uid.in => ids)
    end
  end
end