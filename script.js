document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const course = formData.get('courseId');
    const taskName = formData.get('taskName');
    const dueDate = formData.get('dueDate');
    const additionalDetails = formData.get('additionalDetails');
  
    try {
      const response = await fetch(`/courses/${course}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const tasks = await response.json();
      // Handle tasks data as needed
      console.log(tasks);
    } catch (error) {
      console.error('Error:', error);
    }
  });
  