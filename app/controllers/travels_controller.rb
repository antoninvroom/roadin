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
    @step = Step.new
    @steps = @travel.steps
    @geojson = Array.new
    build_geojson(@steps, @geojson)
  end

  respond_to do |format|
    format.html
    format.json { render json: @geojson }
  end

  def build_geojson(steps, geojson)
    steps.each do |step|
      geojson << GeojsonBuilder.build_step(step)
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

  private
  def travel_params
    params.require(:travel).permit(:title, :description, :begin_date, :end_date, :user,
                                   steps_attributes: [:id, :place, :time_to_stay, :step_description, :address])
  end
end