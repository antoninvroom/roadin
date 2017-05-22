class StepsController < ApplicationController
  before_action :check_travel!

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

  def edit
    @step = @travel.steps.find(params[:id])
  end

  def update
    @step = Step.find(params[:id])
    if @step.update(step_params)
      puts 'step successfully updated'
      redirect_to travel_step_path(@travel, @step)
    else
      puts 'oh god ! Something went wrong !'
      puts @step.errors.full_messages
      render :edit
    end
  end

  def create
    @step = @travel.steps.create!(step_params)
    redirect_to @travel, :notice => 'step created!'
  end

  private
  def step_params
    params.require(:step).permit(:place, :country, :time_to_stay, :step_description)
  end
end
