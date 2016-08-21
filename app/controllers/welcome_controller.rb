class WelcomeController < ApplicationController

  def index
  end

  def test
    @event = Event.find(4)
    # @close_addresses = Address.close_events(@event.address.full_address)

    # @events = Event.where
    # @events = Event.joins(:address).where(addresses: close_events(@event.address.full_address)
    # address_ids = Address.close_events(@event.address.full_address).ids
    # @events = Event.joins(:address).where("addresses.id IN (?)", address_ids)
    @events = Event.nearby('Greencastle, IN')
    respond_to do |format|
      format.json {
      @markers = events_markers(@events)
      render json: @markers
      }
      format.html {}
    end
  end

  private

  def events_markers(events)
    Gmaps4rails.build_markers(events) do |event, marker|
      marker.lat event.address.lat
      marker.lng event.address.lng
      marker.infowindow "<div class='panel panel-default'><img class='img-rounded m-x-auto img-responsive' width='120' height='120' src='#{Refile.attachment_url(event.images.first, :file, :fill, 400, 400)}' /> <div text-center> #{event.description}</div></div>"
    end
  end

end
