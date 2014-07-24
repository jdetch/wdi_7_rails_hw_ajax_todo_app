var TodoApp = {
  todoItems: [],
  initialize: function(){
    //event listeners must be inside initialize function
    $('#new-task-form').submit(this.addTask);
    this.refreshTasks();
  },

  refreshTasks: function() {
    event.preventDefault();
    $.ajax({
        url: 'http://localhost:3000/tasks',
        type: 'GET',
    }).then(function(result){
      $.each(result.tasks, function(index, item) {
        var data = item.tasks;
        var newItem = new TodoItem();
        newItem.title = data.title;
        newItem.id = data.id;
        newItem.created_at = data.created_at;
        newItem.updated_at = data.updated_at;

        TodoApp.todoItems.push(newItem);
      });
      TodoApp.redrawLists();
    });
  },

  addTask: function(event){
    event.preventDefault();
    if($('#new-task-text').val().length === 0){
      alert('Please enter a valid task.');
    } else {
      $.ajax($('form').attr('action'),{
        type: 'POST',
        data: {
          task: { title: $('#new-task-text').val() }
        }
      }).then(function(result) {
        var newItem = new TodoItem();
        newItem.title = result.title;
        newItem.id = result.id;
        TodoApp.todoItems.push(newItem);

        $('#new-task-text').val('');
        TodoApp.redrawLists();
      });
    }
  },

  redrawLists: function(){
    $('#incomplete-tasks-list').empty();
    $('#completed-tasks-list').empty();
    for(var i = 0; i < TodoApp.todoItems.length; i++) {
      var currentItem = TodoApp.todoItems[i];
      if(currentItem.deleted === false) {
        if(currentItem.completed === true) {
          $('#completed-tasks-list').append(currentItem.html());
        } else {
          $('#incomplete-tasks-list').append(currentItem.html());
        }
      }
    }
  }
};
