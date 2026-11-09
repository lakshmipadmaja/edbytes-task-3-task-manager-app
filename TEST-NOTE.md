# Test note — Task FSD-02

## What I changed
I connected the task form so nonblank task descriptions are added to the list. Each task has its own Delete button. I added `loadTasks()` and `saveTasks()` using browser local storage, and the list is rendered from the saved task array when the page opens.

## Tests performed
1. **Ordinary case — PASS:** Added the dummy task `Finish JavaScript practice`. It appeared in the list. After refreshing the page, it appeared again.
2. **Boundary case — PASS:** Submitted an empty/whitespace-only value. The app displayed a validation message and did not add a blank task.
3. **Delete case — PASS:** Deleted the dummy task. It disappeared from the list and remained deleted after refreshing.

## What I learned
I learned that browser `localStorage` can keep a small task list between page refreshes, and that `textContent` is a safer way to display user-entered task text than inserting it as HTML.

## How to run
Open `index.html` in a modern browser. Tasks are stored locally in that browser on that device; they are not uploaded to a server.

## Evidence
This source folder contains the app files, completed checklist, and this test note. To submit, upload the folder to a view-only hosting location or publish the app using an approved static host, then test the link in a private browser window.
