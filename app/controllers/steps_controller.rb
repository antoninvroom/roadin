class StepsController < ApplicationController

  def new

  end

  def create

  end

  private
  def step_params
    params.require(:step).permit(:country, :city, :time_to_stay, :step_description)
  end
end