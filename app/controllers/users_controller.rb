class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]
  before_action :require_user, only: [:dashboard, :change_password]

  def show
  end

  def create
    if Chronic.parse(params[:date_of_birth])
      @dob = Chronic.parse(params[:date_of_birth])
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
    respond_to do |format|
      format.html {render :dashboard}
      if params[:attending]
        format.json {render json: @user.events.order(date: 'DESC')}
      elsif params[:hosting]
        format.json {render json: @user.hosted_events.order(date: 'DESC')}
      else
        format.json {render json: @user, include: ['address', 'hosted_events', 'hosted_events.applications', 'events', 'events.applications', 'applications' 'thumbs', 'images']}
      end
    end
  end

  def update
    if Chronic.parse(params[:date_of_birth])
      @dob = Chronic.parse(params[:date_of_birth])
    else
    # see date_must_be_formatted_correctly validation in user model.
      @dob = Date.parse('10-04-0987')
    end
    if @user.update(user_params.merge({address_attributes: address_params}).merge(date_of_birth: @dob))
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

  def new_password
  end

  def change_password
    @user = current_user
    if @user.authenticate(params[:current_password])
        if @user.update(user_params)
          session[:email] = @user.email
          render json: @user, status: 200
        else
          render json: ["Password fields do not match"], status: 400
        end
    else
      render json: ["Incorrect password"], status: 400
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.permit(:password, :password_confirmation, :email, :first_name, :description, :last_name, :phone, images_files: [])
  end

  def address_params
    params.permit(:street, :city, :state, :zip)
  end

end
