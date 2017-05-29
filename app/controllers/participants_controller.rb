class ParticipantsController < ApplicationController
    before_action :check_travel!

    def check_travel!
      @travel = Travel.find(params[:travel_id]) rescue nil
      if !@travel
          redirect_to root_path, :alert => 'Travel not found'
      end
    end

    def new
      @participant = Participant.new
    end

    def create
      @user = User.find_by(name: params[:participant][:name])
      @participant = @travel.participants.create!(participant_params)
      @participant.user_id = @user.id
      redirect_to @travel, :notice => 'ok, your friend have been added to your travel'
    end

    private
    def participant_params
      params.require(:participant).permit(:user_id)
    end
end
