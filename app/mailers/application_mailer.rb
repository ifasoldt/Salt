class ApplicationMailer < ActionMailer::Base
  default from: 'notifications@salt.com'
  layout 'mailer'
end
