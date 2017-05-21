class ToolboxesController < ApplicationController
  def new
    @toolbox = Toolbox.new
  end

  # create with travel / step id's
  def create
    @travel = Travel.find(params[:travel_id])
    @step = Step.where(id: params[:step_id])
    @toolbox = Toolbox.new(toolbox_params)
    if @toolbox.save
      puts 'toolbox successfully saved'
      redirect_to travel_step_path(@travel, @toolbox.step_id)
    else
      puts 'something went wrong'
      puts @toolbox.errors.full_messages
      redirect_to root_path
    end
  end

  private
  def toolbox_params
    params.require(:toolbox).permit(:step_id, :tool_area, :links)
  end
end
