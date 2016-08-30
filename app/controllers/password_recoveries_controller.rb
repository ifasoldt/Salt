class PasswordRecoveriesController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email: params[:email])
    if @user
      token = SecureRandom.hex(11)
      @password_recovery = PasswordRecovery.create(user_id: @user.id, token: token)
      PasswordRecoveryMailer.set_new_password_email(@password_recovery).deliver
      render json: @password_recovery, status: 200
    else
      render json: ["User not found"]
    end
  end

  def edit
    @password_recovery = PasswordRecovery.find_by(token: params[:id])
    @user = @password_recovery.user
  end

  def update
    @password_recovery = PasswordRecovery.find_by(token: params[:id])
    @user = @password_recovery.user
    if @user.update(password: params[:password], password_confirmation: params[:password_confirmation])
      render json: @user, status: 200
    else
      render json: @user.errors.full_messages, status: 400
    end
  end
end
