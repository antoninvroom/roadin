class ToolboxesController < ApplicationController
  before_filter :check_step!

  def check_step!
    @step = Step.find(params[:step_id]) rescue nil
    if !@step
        redirect_to root_path, :alert => 'Travel not found'
    end
  end

  def new
    @toolbox = Toolbox.new
  end

  def create
    @toolbox = @step.toolbox.create!(toolbox_params)
    redirect_to @travel, :notice => 'step created!'
  end

  private
  def toolbox_params
    params.require(:toolbox).permit(:tool_area, :links)
  end
end
