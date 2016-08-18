class EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :destroy, :update]
  has_scope :allow_children, :type => :boolean
  has_scope :alcohol_allowed, :type => :boolean
  has_scope :date
  # Must be passed a hash like {by_period{starting_date: x, ending_date: y}}
  has_scope :by_period, :using => [:starting_date, :ending_date], :type => :hash
  # Pass "asc" or "desc" inside param. Don't know if this will work.
  has_scope :guest_limit
  has_scope :only_future_events, default: nil, allow_blank: true



  def index
    @events = apply_scopes(Event).all
    respond_to do |format|
      format.html {render :index}
      format.json {render json: @events}
    end
  end

  def show
  end

  def create
    @event = Event.new(event_params.merge(host_id: current_user.id))
    create_address
    if @event.save
      # its annoyingly hard to run validations here at the same time as on the event. Same as in the users controller
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
      create_address
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

  def create_address
    if @event.address
      @event.address.update(address_params)
    else
      @event.address = Address.create(address_params)
    end
  end

  def address_params
    params.permit(:street, :city, :state, :zip)
  end

end
