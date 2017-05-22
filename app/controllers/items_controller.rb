class ItemsController < ApplicationController
	before_action :check_toolbox!

  	def check_toolbox!
    	@toolbox = Toolbox.find(params[:toolbox_id]) rescue nil
    	if !@toolbox
        	redirect_to root_path, :alert => 'Toolbox not found'
    	end
  	end

  	def new
    	@item = Item.new
  	end

  	def show
  		@travel = Travel.find(params[:travel_id])
  		@step = Step.find(params[:step_id])
    	@item = @toolbox.items.find(params[:id])
  	end

  	def create
      @travel = Travel.find(params[:travel_id])
      @step = @travel.steps.find(id: params[:step_id])
      @toolbox = Toolbox.find(params[:toolbox_id])
    	@item = @toolbox.items.create!(item_params)
    	redirect_to travel_step_toolbox_path(@travel, @step, @toolbox)
  	end

  	private
  	def item_params
    	params.require(:item).permit(:type, :title, :trick, :address, :url, :advise)
  	end
end