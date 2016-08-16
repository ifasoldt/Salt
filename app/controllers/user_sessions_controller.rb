class UserSessionsController < ApplicationController

  def create
   @user = User.find_by(email: params[:email])
   if @user
     if @user.authenticate(params[:password])
       session[:email] = @user.email
       redirect_back(fallback_location: root_path)
     else
       render json: {error: "Incorrect email or password"}, status: 400
     end
   else
      render json: {error: "Incorrect email or password"}, status: 400
   end
 end

  def destroy
    session[:email] = nil
    redirect_back(fallback_location: root_path)
  end


end
