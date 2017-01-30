class UsersController < ApplicationController
  def new
    @user = User.new
  end
  def show
    @user = User.find(session[:user_id])
    @recipes = @user.recipes
  end
  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Welcome to the Sample App!"
      redirect_to @user
    else
      render 'new'
    end
  end

  private
    # security feature to prevent injections the would allow admin privelages
    # by only submitting the info designated by the field entries
    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation)
    end
    # Confirms the correct user.
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end

end
