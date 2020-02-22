class UsersController < ApplicationController

  def index
    redirect_to root_path
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @user.save
    redirect_to users_path
  end

  private

  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation)
  end
end