var TodoItem = function() {
  this.id = null;
  this.title = '';
  this.completed = false;
  this.deleted = false;
  this.createdAt = new Date();
  this.completedAt = null;
  this.html = function(){
    var htmlString = "<li><div>"+this.title+"</div>";
    htmlString = htmlString + "<div> Created at: " + this.createdAt.toLocaleString() + "</div>";
    var self = this;

    if(this.completed === false) {
      htmlString = htmlString + '<button class="completed">Completed</button>';
    } else {
      htmlString  = htmlString + '<div>Completed at: '+ this.completedAt.toLocaleString() + '</div>';
    }
    htmlString = htmlString + '<button class="delete">Delete</button>';
    htmlString = htmlString + "</li>";

    //Assign htmlObject to a jQuery object so you can use jQuery functions on it
    // like 'find', etc.
    var htmlObject = $(htmlString);

    htmlObject.find('.delete').click(function(){
      self.deleted = true;
      TodoApp.redrawLists();
    });
    htmlObject.find('.completed').click(function(){
      self.completed = true;
      self.completedAt = new Date();
      TodoApp.redrawLists();
    });

    // You have to return the object so that the redrawLists function knows what
    // to append to the appropriate list
    return htmlObject;
  };
};



// // Article Constructor Function
// var Task = function(id, task){
//   this.id = id;
//   this.task = task;
// };

// // method to generate HTML for one task
// Task.prototype = {
//   html: function(){
//     var taskHTML = '<li id=task_' + this.id + '>' + this.task;
//     taskHTML += '</li>';

//     return taskHTML;
//   }
// };
