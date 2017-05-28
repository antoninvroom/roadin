class WorldsController < ApplicationController
	def show
		@user = User.find(params[:id])
		@world = @user.world
	end

	def new
		@world = World.new
	end

	def create
		@world = World.new(world_params)
		@world.user = current_user
		if @world.save
			puts 'ok world is create'
			redirect_to user_world_path(@world.user_id, @world)
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