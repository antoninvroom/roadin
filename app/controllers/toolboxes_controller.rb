class ToolboxesController < ApplicationController


  private
  def toolbox_params
    params.require(:toolbox).permit(:tool_area, :links)
  end
end
