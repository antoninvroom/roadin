class StepsController < ApplicationController
  before_filter :check_travel!

  def check_travel!
    @travel = Travel.find(params[:travel_id]) rescue nil
    if !@travel
        redirect_to root_path, :alert => 'Travel not found'
    end
  end

  def new
    @step = Step.new
  end

  def show
    @step = @travel.steps.find(params[:id])
  end

  def create
    @step = @travel.steps.create!(step_params)
    redirect_to @travel, :notice => 'step created!'
  end

  private
  def step_params
    params.require(:step).permit(:place, :time_to_stay, :step_description)
  end
end
