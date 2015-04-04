class MessagesController < ApplicationController
	def create
		begin
			UserMailer.email_us(params).deliver
		rescue
			render json: :nothing, status: 500
			return
		end
		render json: :nothing, status: 200
	end
end
