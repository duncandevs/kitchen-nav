class AddUniqueToFavorites < ActiveRecord::Migration[5.0]
  def change
    add_index :favorites, [:recipe_id, :user_id], unique: true
  end
end
