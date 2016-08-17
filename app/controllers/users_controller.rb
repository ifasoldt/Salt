class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  def show
  end

  def create
    @user = User.new(user_params)
    if /^\d{2}-\d{2}-\d{4}$/.match(@user.date_of_birth)
      @user.date_of_birth = Date.parse(params[:date_of_birth])
    else
      # see date_must_be_formatted_correctly validation in user model.
      @user.date_of_birth = Date.parse('10-04-0987')
    end
    if @user.save
      session[:email] = @user.email
      render json: @user
    else
      render json: @user.errors.full_messages, status: 400
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
     render json: @user.errors.full_messages, status: 400
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
    params.permit(:password, :password_confirmation, :email, :first_name, :last_name)
  end

end
