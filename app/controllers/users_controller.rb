class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy, :edit]

  def index
    @users = User.all
  end

  def show
    @user = current_user
    @travels = @user.travels
  end

  def edit
  end

  def update
    if @user.update(params)
      redirect_to user_path(@user)
    else
      render 'edit'
    end
  end

  def destroy
    @user.destroy
    redirect_to root_path
  end

  private
  def user_params
    params.require(:user).permit(:name, :picture)
  end

  def set_user
    @user = User.find(params[:id])
  end
end