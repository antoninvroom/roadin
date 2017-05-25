class WorldsController < ApplicationController
	def show
		@world = World.find(params[:id])
	end

	def new
		@world = World.new
	end

	def create
		@world = World.new(world_params)
		if @world.save
			puts 'ok world is create'
			redirect_to user_world_path(current_user, @world)
		else
			puts 'oups ! something went wrong'
			render :new
		end
	end

	private
	def world_params
		params.require(:world).permit(:user)
	end
end