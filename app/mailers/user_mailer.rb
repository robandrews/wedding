class UserMailer < ActionMailer::Base
  default from: "robert.alan.andrews@gmail.com"
  def email_us params
  	@name = params["name"]
  	@email = params["email"]
  	@body = params["body"]
  	mail(to: ["robert.alan.andrews@gmail.com", "mjdirado@gmail.com"], subject:"Wedding Message from #{@name}")
  end
end
