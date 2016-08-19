class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :destroy, :update]
  # has_scope :allow_children, :type => :boolean
  # has_scope :alcohol_allowed, :type => :boolean
  # has_scope :date
  # # Must be passed a hash like {by_period: {starting_date: x, ending_date: y}}
  # has_scope :by_period, :using => [:starting_date, :ending_date], :type => :hash
  # # Pass "asc" or "desc" inside param. Don't know if this will work.
  # has_scope :guest_limit
  # has_scope :only_future_events, default: nil, allow_blank: true

  def index
    @events = apply_scopes(Event).all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @events}
    end
  end

  def show
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @event}
    end
  end

  def create
    unless params[:user_address] == true
      @event = Event.new(event_params.merge(host_id: current_user.id).merge({address_attributes: address_params}))
    else
      @event = Event.new(event_params.merge(host_id: current_user.id))
      @event.address = current_user.address
    end
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
    unless params[:user_address] == true
      if @event.update(event_params.merge({address_attributes: address_params}))
        render json: @event, status: 200
      else
        render json: @event.errors.full_messages, status: 400
      end
    else
      if @event.update(event_params)
        @event.address = current_user.address
        render json: @event, status: 200
      else
        render json: @event.errors.full_messages, status: 400
      end
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
    params.permit(:description, :food, :guest_limit, :time, :date, :title, :allow_children, :alcohol_allowed, :unlimited_guests, :filter_guests, images_files: [])
  end

  def address_params
    params.permit(:street, :city, :state, :zip)
  end

end
