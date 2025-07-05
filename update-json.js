import fs from 'fs';
const path = './src/data/roadmapData.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

// Add imageUrl field to all documentation objects
data.weeks.forEach(week => {
  // Add to daily tasks
  week.dailyTasks.forEach(task => {
    if (task.documentation && !task.documentation.imageUrl) {
      task.documentation.imageUrl = '';
    }
  });
  
  // Add to project documentation
  if (week.project && week.project.documentation && !week.project.documentation.imageUrl) {
    week.project.documentation.imageUrl = '';
  }
});

// Add to global documentation
if (data.progressTracking && data.progressTracking.documentation && !data.progressTracking.documentation.imageUrl) {
  data.progressTracking.documentation.imageUrl = '';
}

if (data.finalProject && data.finalProject.documentation && !data.finalProject.documentation.imageUrl) {
  data.finalProject.documentation.imageUrl = '';
}

fs.writeFileSync(path, JSON.stringify(data, null, 2));
console.log('Successfully added imageUrl field to all documentation objects');
