class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :destroy, :update]

  def index
    @events = Event.where("date >= ?", Date.today)
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @events}
    end
  end

  def show
  end

  def create
    # @allow_children = to_boolean(params[:allow_children])
    # @alcohol_allowed = to_boolean(params[:alcohol_allowed])
    # @unlimited_guests = to_boolean(params[:unlimited_guests])
    # Rails.logger.info @unlimited_guests
    @event = Event.new(event_params.merge(host_id: current_user.id))
    if @event.save
      render json: @event, status: 200
    else
      render json: @event.errors.full_messages, status: 400
    end
  end

  def edit
    render json: @event
  end

  def update
    if @event.update(event_params)
      render json: @event, status: 200
    else
      render json: @event.errors.full_messages, status: 400
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
    params.permit(:description, :food, :guest_limit, :time, :date, :title, :allow_children, :alcohol_allowed, :unlimited_guests, :filter_guests)
  end

  # def to_boolean(str)
  #   str == true
  # end

end
