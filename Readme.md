### A Project Management application Backend

# --- Technologies Used ---

- NodeJs
- ExpressJs
- Mongo Db

# Api's available:

`Project:`

- Create (POST: /api/project/add , { body: { name, description, startDate, endDate, tasks: [], resources: [] } })
- Update (PATCH: /api/project/update)
- Read all (GET: /api/project/all)
- Read one (GET: /api/project/:id)
- Delete (DELETE: /api/project/delete/:id)

`Task for a project:`

- Create (POST: /api/task/:projectId/add , { body: { title, startDate, endDate, duration, subTasks: [], resource: [], additionalInfo, isExpanded, isTaskCompleted } })
- Create subtask (POST: /api/task/:projectId/add/:parentTaskId , { body: { title, startDate, endDate, duration, subTasks: [], resource: [], additionalInfo, isExpanded, isTaskCompleted } })
- Update (PUT: /api/task/:projectId/update/:taskId, { data: {...} })
- Read all (GET: /api/task/:projectId/all)
- Delete (DELETE: /api/task/:projectId/delete/:taskId)
