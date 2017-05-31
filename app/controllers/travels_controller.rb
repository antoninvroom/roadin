class TravelsController < ApplicationController
  def new
    @travel = Travel.new
  end

  def create
    @travel = Travel.new(travel_params)
    @travel.user = current_user
    if @travel.save
      puts "ok it saved"
      redirect_to user_path(current_user)
    else
      puts "oh ! something went wrong"
      puts @travel.errors.full_messages
      render 'new'
    end
  end

  def show
    @travel = Travel.find(params[:id])
    @user = @travel.user
    @step = Step.new
    @steps = @travel.steps
    @participants = User.where(id: @travel.participants.pluck(:user_id).first)
    @geojson = Array.new
    @steps.each do |step|
      if !step.toolbox.nil?
        toolbox_url = travel_step_toolbox_path(@travel, step, step.toolbox.id)
      else
        toolbox_url = travel_step_path(@travel, step)
      end
      if !step.nil?
        @geojson << {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [step.coordinates[0], step.coordinates[1]]
            },
            properties: {
                place: step.place,
                time: step.time_to_stay,
                toolbox: toolbox_url,
                desc: step.step_description,
                'marker-color': '#ff7e5f',
                'marker-size': 'large',
                'marker-symbol': 'roadin-icon-01-01'
            }
        }
      end
    end
    respond_to do |format|
      format.html
      format.json { render json: @geojson }
    end
  end

  def update
    @travel = Travel.find(params[:id])
    if @travel.update_attributes(travel_params)
      puts 'it is ok'
      @travel.save
      redirect_to travel_path(@travel)
    else
      render 'show'
    end
  end

  def autocomplete
    @user_fb_token = current_user.auth_token
    unless @user_fb_token.blank?
      @fb_friends = FbGraph2::User.me(@user_fb_token).friends
      @fb_friends = @fb_friends.sort_by { |fb_frnd| fb_frnd.raw_attributes['name']}
      ids = @fb_friends.map {|s| s.id}
      @friends = User.where(:uid.in => ids)
    end
    @friends.map do |friend|
      {
        name: friend.name,
      }
    end
    render json: @friends
  end

  private
  def travel_params
    params.require(:travel).permit(:title, :description, :begin_date, :end_date, :user, :budget,
                                   steps_attributes: [:id, :place, :time_to_stay, :step_description, :address])
  end
end
