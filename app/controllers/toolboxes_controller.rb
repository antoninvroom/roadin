class ToolboxesController < ApplicationController

  def new
    @toolbox = Toolbox.new
  end

  def create
    @step = Step.find(params[:step_id]) if params[:step_id]
    @toolbox = Toolbox.new(toolbox_params)
    if @toolbox.save
      puts 'toolbox successfully saved'
      redirect_to travel_step_path(@step)
    else
      puts 'something went wrong'
      puts @toolbox.errors.full_messages
      redirect_to root_path
    end
  end

  private
  def toolbox_params
    params.require(:toolbox).permit(:step, :tool_area, :links)
  end
end
