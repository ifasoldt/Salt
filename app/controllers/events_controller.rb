class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :destroy]

  def index
  end

  def show
  end

  def create
    @event = Event.new(event_params.merge(host_id: current_user.id))
    if @event.save
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
    params.permit(:description, :food, :guest_limit, :time, :date, :alcohol_allowed, :allow_children, :title, :unlimited_guests)
  end

end
