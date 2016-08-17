class ApplicationsController < ApplicationController

  def create
    @application = Application.new(application_params)
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
      params.permit(:event_id, :user_id, :quantity, :message)
  end
end
