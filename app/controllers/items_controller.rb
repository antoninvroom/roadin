class ItemsController < ApplicationController
	def new
		@item = Item.new
	end

	def create
		@travel = Travel.find(params[:travel_id])
	    @step = Step.where(id: params[:step_id])
	    @toolbox = Toolbox.new
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
		params.require(:item).permit(:toolbox_id, :type, :title, :trick, :address, :url)
	end
end