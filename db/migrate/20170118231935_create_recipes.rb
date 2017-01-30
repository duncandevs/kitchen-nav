class CreateRecipes < ActiveRecord::Migration[5.0]
  def change
    create_table :recipes do |t|
      t.text :recipetitle
      t.text :ingredients
      t.text :directions
      t.references :user, foreign_key: true
      t.text :imageurl
      t.text :time
      t.text :serves

      t.timestamps
    end
    add_index :recipes, [:user_id, :created_at]
  end
end
