class SessionsController < ApplicationController
  #renders the new page when called by login link
  def new
  end
  #handles the form submition
  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      log_in user
      redirect_to user
    else #handle invalid login submition
      flash.now[:danger] = 'Invalid email/password combination'
      render 'new'
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end
  def guest
    log_out
    user = User.find_by(email: "guest@gmail.com")
    log_in user
    redirect_to user
  end
end
