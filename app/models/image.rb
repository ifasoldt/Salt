class Image < ApplicationRecord
  belongs_to :imageable, polymorphic: true, optional: true
  attachment :file

end
