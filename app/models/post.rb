class Post < ApplicationRecord
  validates :title, :content, presence: true
  belongs_to :user

  def self.search(search)
    if search
      Post.where(['content LIKE ?', "%#{search}%"])
    else
      Post.all
    end
  end


end
