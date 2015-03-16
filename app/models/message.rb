# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  body       :text
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Message < ActiveRecord::Base
end
