class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :destroy, :update]
  before_action :format_params, only: [:index]
  has_scope :allow_children, :type => :boolean
  has_scope :alcohol_allowed, :type => :boolean
  # can be formatted a few different ways, but MM-DD-YYYY works
  has_scope :date
  # Can just take the two below params and knows where to use them.
  has_scope :by_period, :using => [:starting_date, :ending_date], :type => :hash
  # Pass "asc" or "desc" inside param. Don't know if this will work.
  has_scope :guest_limit
  has_scope :only_future_events, default: nil, allow_blank: true
  has_scope :chronological, default: nil, allow_blank: true

  def index
    # breaks if no params[:location] Temp fix below.
    if params[:location]
      @events = apply_scopes(Event).all&.nearby(params[:location])
    else
      @events = apply_scopes(Event).all
    end
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @events}
    end
  end

  def show
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @event, include: ['comments', 'comments.user', 'host', 'images'] }
    end
  end

  def create
    unless params[:user_address] == "true"
      @event = Event.new(event_params.merge(host_id: current_user.id).merge({address_attributes: address_params}))
    else
      @event = Event.new(event_params.merge(host_id: current_user.id))
      #currently letting me save even if current_user.address is nil
      # overwriting current_user_address
      @event.address = current_user.address.dup
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
    unless params[:user_address] == "true"
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

  def format_params
    if params[:starting_date] && params[:ending_date]
      params[:by_period] = {starting_date: params[:starting_date], ending_date: params[:ending_date]}
    end
  end

end
