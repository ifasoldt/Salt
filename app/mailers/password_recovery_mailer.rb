class PasswordRecoveryMailer < ApplicationMailer
  def set_new_password_email(password_recovery)
    @password_recovery = password_recovery
    mail( :to => @password_recovery.user.email, :subject => "Your Salt Password Reset Link")
  end
end
