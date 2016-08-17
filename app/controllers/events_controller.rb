class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :create, :destroy]

  def index
  end

  def show
  end

  def create
    if @event.create(event_params.merge(host_id: current_user.id))
      redirect_to event_path(@event)
    else
      render json: @event.errors, status: 400
    end
  end

  def edit
    render json: @event
  end

  def update
    if @event.update(event_params)
      redirect_to event_path(@event)
    else
      render json: @event.errors, status: 400
    end
  end

  def destroy
    @event.destroy
  end

  private

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.permit(:description, :food, :drink, :guest_limit, :time, :date, :serving_alcohol, :allow_children, :title, )
  end

end
