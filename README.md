# Hotel Bookings Project

## Requirements

- React and VSCode

- Java and Intellij

- A Git GUI, preferably GitBash

- A web browser, preferably Chrome


## Getting Started

Below you will find what steps you need to perform to get the app up and running.

### Backend

1. Download project backend, if you have proper access it is available at the link below :
*https://gitlab.catalyt.es/training/cycleworkinggroups/nationwide/shared-projects/frontend-frameworks/hotel-api*.

2. Open up the backend in Intellij. Run it using the Run arrow at the top right, or by right-clicking the **HotelApiApplication** file and selecting `Run HotelApiApplication....main()`.

3. You can also stop the backend by hitting the red square at the top right.

### Frontend

1. Open up the frontend in VSCode. If you have to proper access rights it is available for download from the link below:
*https://gitlab.catalyt.es/training/cycleworkinggroups/nationwide/associates/nicolas-hemenway/hotel-bookings*.

2. Open your Git GUI and Navigate to the frontend app root repository.

3. Run `npm install`.

4. Once all the dependencies have finished intalling run `npm start`. The app should automatically open in your browser.


## Testing and Linting

### Testing

1. Open Git GUI

2. Navigate to the frontend root directory

3. Run `npm test`

4. To test coverage run `npm test -- --coverage`

5. To test the entire project with coverage run `npm test -- --coverage --changedSince=master`

### Linting

Run `npm run lint`