class RecipesController < ApplicationController
  before_action :logged_in_user

  # this action is called when the form is submitted, it creates a new instance of recipe
  def new
    @recipe = Recipe.new
    @userid = current_user.id
  end
  def create
    @recipe = current_user.recipes.build(recipe_params)
    @user = current_user
    if @recipe.save
      flash[:success] = "Recipe created!"
      redirect_to "/users/#{@user.id}" #make sure you re-direct to recipe page
    else
      render 'new'
    end
  end

  def destroy
    @recipe = Recipe.find(params[:id]);
    if @recipe.present?
      @recipe.destroy
      flash[:success] = "Recipe deleted"
      redirect_to request.referrer || root_url
    end
  end

  #show individual recipes model after the user resources
  def show
    @recipe = Recipe.find(params[:id])
  end

  private

  def recipe_params
    params.require(:recipe).permit(:recipetitle, :ingredients, :directions, :user_id, :imageurl, :time, :serves)
  end
end
