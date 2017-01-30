module SessionsHelper
  def log_in(user) # starts the session
    session[:user_id] = user.id
  end
  def current_user #defines the current user for use in other pages
    @current_user ||= User.find_by(id: session[:user_id])
  end
  def logged_in?
    !current_user.nil?
  end
  def log_out
    session.delete(:user_id)
    @current_user = nil
  end
end
