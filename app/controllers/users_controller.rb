class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to action: "dashboard"
    else
      render json: @user.errors
    end
  end

  def dashboard
    @user = current_user
  end

  def update
   if @user.update(user_params)
     session[:email] = @user.email
     redirect_to action: "dashboard"
   else
     render json: @user.errors
   end
  end

  def destroy
    @user.destroy
    redirect_to root_path
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:password, :password_confirmation, :email, :first_name, :last_name, :date_of_birth)
  end

end
