class ApplicationsController < ApplicationController
  before_action :require_user, only: [:create]
  before_action :set_application, only: [:update, :destroy]
  before_action :require_host, only: [:update]

  def create
    @application = current_user.applications.new(application_params.merge(user_id: current_user.id))
    set_applicaton_status
    if @application.save
      render json: @application
    else
      render json: @application.errors.full_messages, status: 400
    end
  end

  def update
    @application.update(status: params[:status])
    if params[:status] == 'approved'
      ApplicationStatusChangeMailer.application_approved_email(@application).deliver
    else
      ApplicationStatusChangeMailer.application_rejected_email(@application).deliver
    end
    render json: @application
  end

  def destroy
    @application.destroy
    render json: @application, status: 200
  end

  private

  def application_params
    params.permit(:event_id, :quantity, :message)
  end

  def set_application
    @application = Application.find(params[:id])
  end

  def set_applicaton_status
    Event.find(params[:event_id]).filter_guests ? @application.status = 'pending' : @application.status = 'approved'
  end

  def require_host
    redirect_back(fallback_location: root_path, flash: {danger: "You're not allowed to do that"}) unless @application.event.host == current_user
  end
end
