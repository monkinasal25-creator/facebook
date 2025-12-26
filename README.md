Facebook Profile Viewer Project

PROJECT DESCRIPTION

This project is a web-based application that integrates with the Facebook Graph API to fetch and display user profile information. Users can enter their Facebook access token to retrieve comprehensive profile details including personal information, contact details, location data, and profile picture. The application features a clean and responsive interface with error handling, loading indicators, and a mobile-responsive design that works across all device sizes. The profile information is displayed in an organized card layout that expands to accommodate all available data.

API DETAILS USED

Base URL
https://graph.facebook.com/v18.0

Endpoints

User Profile Endpoint
GET /me
This endpoint retrieves the authenticated user's profile information. It accepts an access token and returns user data based on the requested fields parameter.

Required Parameters
access_token: The Facebook access token of the user (passed as query parameter)
fields: Comma-separated list of fields to retrieve (id, name, email, picture, birthday, gender, location, hometown, about, website, link, age_range, verified, first_name, last_name, middle_name)

Authentication
Access Token Authentication
The application uses Access Token authentication method. The access token must be included as a query parameter in each request using the format: access_token=YOUR_ACCESS_TOKEN_HERE

The access token is entered by the user in the input field and should not be hardcoded. Users must obtain a valid Facebook access token through Facebook's OAuth authentication flow or Graph API Explorer.

Sample JSON Response

{
  "id": "123456789",
  "name": "John Doe",
  "first_name": "John",
  "middle_name": "Michael",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "birthday": "01/15/1990",
  "gender": "male",
  "location": {
    "name": "New York, New York"
  },
  "hometown": {
    "name": "Los Angeles, California"
  },
  "about": "Software developer and tech enthusiast",
  "website": "https://johndoe.com",
  "link": "https://www.facebook.com/johndoe",
  "age_range": {
    "min": 30,
    "max": 35
  },
  "verified": true,
  "picture": {
    "data": {
      "url": "https://graph.facebook.com/v18.0/123456789/picture"
    }
  }
}

Fields displayed in UI: All available fields from the response are displayed including id, name, first_name, middle_name, last_name, email, birthday, gender, location, hometown, about, website, link, age_range, verified, and picture.

INSTRUCTIONS TO RUN THE PROJECT

Step 1: Get Facebook Access Token
Obtain a Facebook access token through Facebook Graph API Explorer at https://developers.facebook.com/tools/explorer
Alternatively, implement Facebook OAuth login to get user access tokens
Copy the access token for use in the application

Step 2: Open the Application
Open the index.html file in a web browser
Alternatively, use a local web server such as XAMPP, WAMP, or Live Server extension

Step 3: Using the Profile Viewer
Enter your Facebook access token in the input field at the top of the page
Click the Fetch Profile button or press Enter to fetch your profile data
Wait for the profile information to load and display in the result area
View all available profile details including picture, personal information, and contact details


SCREENSHOTS

<img width="1174" height="757" alt="image" src="https://github.com/user-attachments/assets/2b48b76e-80e6-4901-8cc7-d76691c746d4" />

MEMBERS LISTED AND ROLES

Member 1: API and Authentication Handler
Responsible for implementing the Facebook Graph API integration, setting up access token authentication, handling API requests and responses, managing field parameters, and processing the /me endpoint data.

Member 2: JavaScript Logic and Data Processing
Responsible for writing the core JavaScript functions, implementing async/await for API calls, processing API responses, handling user input validation, managing profile data display, and creating dynamic DOM elements for profile information.

Member 3: UI and CSS Designer
Responsible for designing the user interface, creating responsive CSS layouts with black and white theme, implementing loading animations, styling error messages, designing profile card layouts, and ensuring the design works across all screen sizes including mobile devices.

Member 4: GitHub and Documentation Manager
Responsible for setting up the GitHub repository, managing branches and pull requests, creating the README documentation, organizing project files, and ensuring proper version control practices are followed.


