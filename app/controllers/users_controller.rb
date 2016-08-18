class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :require_user, only: [:dashboard]

  def show
  end

  def create
    if /^\d{1,2}-\d{1,2}-\d{4}$/.match(params[:date_of_birth])
      @dob = Date.parse(params[:date_of_birth])
    else
      # see date_must_be_formatted_correctly validation in user model.
      @dob = Date.parse('10-04-0987')
    end
    @user = User.new(user_params.merge(date_of_birth: @dob))
    if @user.save
      session[:email] = @user.email
      render json: @user
    else
      render json: @user.errors.full_messages, status: 400
    end
  end

  def dashboard
    @user = current_user
    render json: @user, include: ['hosted_events', 'hosted_events.applications']
  end

  def update
   if /^\d{2}-\d{2}-\d{4}$/.match(params[:date_of_birth])
     @dob = Date.parse(params[:date_of_birth])
   else
     # see date_must_be_formatted_correctly validation in user model.
     @dob = Date.parse('10-04-0987')
   end
   Rails.logger.info user_params.inspect
   if @user.update(user_params.merge(date_of_birth: @dob))
     create_address
     session[:email] = @user.email
     render json: @user
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
    params.permit(:password, :password_confirmation, :email, :first_name, :last_name, :phone, :images_files)
  end




  def create_address
    if @user.address
      @user.address.update(address_params)
    else
      @user.address = Address.create(address_params)
    end
  end

  def address_params
    params.permit(:street, :city, :state, :zip)
  end

end
