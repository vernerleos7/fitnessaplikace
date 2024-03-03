window.addEventListener('DOMContentLoaded', function() {
  const savedActivities = JSON.parse(localStorage.getItem('activities')) || [];
  
  const weeklyGoal = parseInt(localStorage.getItem('weeklyGoal')) || 0;
  
  document.getElementById('goalText').textContent = weeklyGoal;
  
  let totalMinutes = 0;
  savedActivities.forEach(function(activity) {
    totalMinutes += activity.time;
    renderActivity(activity);
  });
  document.getElementById('totalTime').textContent = totalMinutes;

  updateGoalProgress(totalMinutes, weeklyGoal);
});

document.getElementById('activityForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const activityName = document.getElementById('activityName').value;
  const activityDay = document.getElementById('activityDay').value;
  const activityTime = parseInt(document.getElementById('activityTime').value);
  const activityNotes = document.getElementById('activityNotes').value;

  const newActivity = {
    name: activityName,
    day: activityDay,
    time: activityTime,
    notes: activityNotes
  };

  let activities = JSON.parse(localStorage.getItem('activities')) || [];
  activities.push(newActivity);
  localStorage.setItem('activities', JSON.stringify(activities));

  renderActivity(newActivity);

  let totalMinutes = parseInt(document.getElementById('totalTime').textContent) || 0;
  totalMinutes += activityTime;
  document.getElementById('totalTime').textContent = totalMinutes;

  const weeklyGoal = parseInt(localStorage.getItem('weeklyGoal')) || 0;
  updateGoalProgress(totalMinutes, weeklyGoal);

  this.reset();
});

document.getElementById('goalForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const weeklyGoal = parseInt(document.getElementById('weeklyGoal').value);
  localStorage.setItem('weeklyGoal', weeklyGoal);
  document.getElementById('goalText').textContent = weeklyGoal;
  updateGoalProgress(parseInt(document.getElementById('totalTime').textContent), weeklyGoal);
});

function renderActivity(activity) {
  const activityList = document.getElementById('activityList');
  const listItem = document.createElement('li');
  listItem.className = 'list-group-item';
  listItem.innerHTML = `<strong>${activity.name}</strong> - ${activity.day} - ${activity.time} minut<br> ${activity.notes}`;
  
  const deleteButton = document.createElement('button');
  deleteButton.className = 'btn btn-danger btn-sm float-end';
  deleteButton.textContent = 'Smazat';
  deleteButton.addEventListener('click', function() {
    deleteActivity(listItem, activity.time);
  });
  listItem.appendChild(deleteButton);

  activityList.appendChild(listItem);
}

function deleteActivity(listItem, activityTime) {
  listItem.remove();

  let totalMinutes = parseInt(document.getElementById('totalTime').textContent) || 0;
  totalMinutes -= activityTime;
  document.getElementById('totalTime').textContent = totalMinutes;

  const weeklyGoal = parseInt(localStorage.getItem('weeklyGoal')) || 0;
  updateGoalProgress(totalMinutes, weeklyGoal);
}

function updateGoalProgress(totalMinutes, weeklyGoal) {
  const progress = (totalMinutes / weeklyGoal) * 100;
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  progressBar.style.width = progress + '%';
  progressText.textContent = totalMinutes;
}
