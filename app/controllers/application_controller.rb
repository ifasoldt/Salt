class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  helper_method :current_user

  def require_user
    redirect_back(fallback_location: root_path, flash: {danger: "You need to be logged in to do that"}) unless current_user
  end

  def current_user
    if session[:email]
     @current_user ||= User.find_by(email: session[:email])
    end
    @current_user
  end

end
