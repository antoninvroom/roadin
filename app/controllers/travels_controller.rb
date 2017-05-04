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
  end

  private
  def travel_params
    params.require(:travel).permit(:title, :description, :begin_date, :end_date, :user)
  end
end