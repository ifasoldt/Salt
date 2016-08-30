class PasswordRecovery < ApplicationRecord
  belongs_to :user
  validates :token, uniqueness: true
end
