class UserSessionsController < ApplicationController

  def create
   @user = User.find_by(email: params[:email])
   if @user
     if @user.authenticate(params[:password])
       session[:email] = @user.email
       redirect_back(fallback_location: root_path)
     else
       render json: {error: "Incorrect email or password"}
     end
   else
      render json: {error: "Incorrect email or password"}
   end
 end

  def destroy
    session[:email] = nil
    redirect_back(fallback_location: root_path)
  end

  def require_user
    redirect_back(fallback_location: root_path, flash: {danger: "Please login or register."}) unless current_user
  end



end
