class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :create, :destroy]

  def index
  end

  def show
  end

  def edit
    render json: @event
  end

  def create
    if @event.create(event_params)
      redirect_to event_path(@event)
    else
      render json: @event.errors
    end
  end

  def update
    if @event.update(event_params)
      redirect_to event_path(@event)
    else
      render json: @event.errors
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
    params.permit(:host_id, :description, :food, :drink, :guest_limit, :time)
  end

end
