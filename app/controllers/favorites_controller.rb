class FavoritesController < ApplicationController
  before_action :logged_in_user
  def show
    @user = current_user
    @favorites = current_user.favorites
  end
  def follow
    Favorite.create(user_id: current_user.id, recipe_id: params[:recipeid])
    flash[:success] = "recipe added to favorites"
  end
  def destroy
    @favorite = Favorite.find(params[:id]);
    if @favorite.present?
      @favorite.destroy
      flash[:success] = "recipe removed from favorites" 
      redirect_to request.referrer || root_url
    end
  end
end
