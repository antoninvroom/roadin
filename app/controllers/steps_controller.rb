class StepsController < ApplicationController

  def new
    @step = Step.new
  end

  def create
    @travel = Travel.find(params[:travel_id])
    @step = Step.new(step_params)
    if @step.save
      puts 'its okay ! '
      redirect_to user_path(current_user)
    else
      puts 'oh god something went wrong !'
      @step.errors.full_messages
      redirect_to travels_path(@step.travel)
    end
  end

  private
  def step_params
    params.require(:step).permit(:country, :city, :time_to_stay, :step_description)
  end
end