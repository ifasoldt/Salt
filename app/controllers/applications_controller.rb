class ApplicationsController < ApplicationController
  before_action :require_user only: [:create]

  def create
    @application = Application.new(application_params.merge(user_id: current_user.id))
    if @application.save
      render json: @application
    else
      render json: @application.errors.full_messages, status: 400
    end
  end

  def update
    @application = Application.find(params[:id])

  end

  def destroy

  end

  private

  def application_params
      params.permit(:event_id, :quantity, :message)
  end
end
