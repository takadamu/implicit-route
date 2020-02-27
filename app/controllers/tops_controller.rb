class TopsController < ApplicationController

  def index
    @posts = Post.all
    @search = Post.ransack(params[:q])
    @results = @search.result.order("created_at DESC")
  end


  
end
