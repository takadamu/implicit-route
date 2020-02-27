class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.text :title
      t.text :content
      t.text :content_url
      t.text :image_url
      t.text :image
      t.timestamps
    end
  end
end