class ApplicationStatusChangeMailer < ApplicationMailer

  def application_approved_email( application)
    @application = application
    mail( :to => @application.user.email, :subject => "Your Request To Join The Event #{@application.event.title} Has Been Approved")
  end

  def application_rejected_email(application)
    @application = application
    mail( :to => @application.user.email, :subject => "Your Request To Join The Event #{@application.event.title} Has Been Denied")
  end

end
