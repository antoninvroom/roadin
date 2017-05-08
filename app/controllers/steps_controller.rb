class StepsController < ApplicationController

  def new
    @step = Step.new
  end

  def create
    @travel = Travel.find(params[:travel_id])
    @step = @travel.steps.create!(step_params)
    redirect_to @travel, :notice => 'step created!'
  end

  private
  def step_params
    params.require(:step).permit(:place, :time_to_stay, :step_description)
  end
end