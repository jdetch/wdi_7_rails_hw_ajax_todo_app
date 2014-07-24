class TasksController < ApplicationController

  # ONLY respond to request for JSON
  respond_to :json

  def index
    @tasks = Task.all
    # like a render json: @tasks
    respond_with(@tasks)
  end

  def show
    @task = Task.find(params[:id])
    respond_with(@task)
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      respond_with(@task)
    else respond_with(@task.errors)
    end
  end

  private

  def task_params
    params.require(:task).permit(:title)
  end

end
