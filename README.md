#### Team Name - AutoMate
#### Problem Statement - 

Every day, thousands of people face the daunting task of finding an auto-rickshaw for their daily commute, whether it's to work, college, or commonly visited places. The struggle is real, with escalating fares and the frustration of locating a vacant auto.

 But AutoMate offers a lifeline. It's a remedy for the challenges of cost-effective and efficient commuting. AutoMate eliminates the awkwardness of approaching strangers for shared rides by seamlessly connecting users heading to the same destination, making life easier for everyone.

With AutoMate, you no longer have to embark on that auto ride alone. This innovative solution fosters community, eliminates long waits, and redefines daily commutes. AutoMate is about connecting people, cutting costs, and making each journey a memorable part of your day. 


## A Brief of the Prototype:


### Features

- 🖥️ Standalone Flask API Server
- 🌐 Single Page APP(SPA) using React
- 🔐 JWT Auth
- ⚡ Real time user matching
- 🌍 Live user Location using google maps api



### AutoMate (at its current state prototype) can do the following:

#### 1. User Registration and Login:

New users can create an account by providing their details.
Existing users can log in with their credentials.

#### 2. User Preferences:

Users can set preferences for ride partners, such as age and gender.

#### 3. Location Access:

Upon successful login, the system prompts users to allow access to their current location.

#### 4. Dashboard and Map Display:

After granting location access, the dashboard displays a map embedded with the user's current location.

#### 5. Search for Destination:

Users can search for their destination, aided by an autocomplete feature using google maps api.


#### 6. Matching Nearby Passengers:

Our vv adavanced algorithm searches for other users within 500 meters who are traveling to the same destination.

#### - Matching Process:

If other users with the same destination are found, they are presented to the user as potential ride partners.

#### - Accept or Reject:

Users can choose to accept or reject a ride with the matched partner based on provided details.

#### - Route Planning:

If both parties accept the ride, the system redirects them to Google Maps with the final destination and the route to their mate's location as a waypoint.


## Google Maps APIs used
- Maps Embed API
- Distance Matrix API
- Places Autocomplete API
  
## Tech Stack: 
   
### Backend

- Python Flask
- Sqlite
- Google Maps Python Library


### Frontend

- React
- JavaScript, HTML, CSS
- Animate.css
- Tailwind CSS
- Google Maps React Library

 
   
### Step-by-Step Code Execution Instructions:
  
### Install backend requirements
```
cd /Backend
pip install -r requirements.txt

```

### Install frontend requirements
```
cd /Frontend
npm install
```
<br>

## Project setup
<br>

### Run API server 
```
cd /Backend
python3 main.py
```


## Frontend Server

### Compiles and hot-reloads for development
```
npm run dev
```

### Compile for building the web
```
npm run build
```
### Deploy dist folder
```
cd  /dist
python3 -m http.server
```
  
### Future Scope:

#### Filtering Matched Users According to Set Preferences:

Implement advanced filtering options that allow users to refine their matched ride-sharing partners based on their preferences. This can include filtering by age, gender, ratings, and even shared interests or commuting habits

#### Editing of Profiles:

Enable users to edit and update their profiles easily. They should have the flexibility to add or modify information, profile pictures, and preferences whenever needed.

#### Enhanced User Profiles

Improving user profiles to include more detailed information, such as user ratings, reviews, and a profile picture, to build trust among potential ride-sharing partners.

#### Setting More Preferences:

Expand the range of user preferences to include factors like smoking or non-smoking, music preferences, language preferences. This allows users to find the most compatible ride-sharing partners.

#### Platform Compatibility:
 Develop the application for both major mobile platforms, iOS and Android, to reach a broader user base.

#### In-App Chat and Communication:

Provide a secure in-app chat or messaging feature to facilitate communication between matched users. This can be important for coordination and sharing real-time updates during the ride.

#### User Ratings and Reviews:

Encourage users to leave reviews and ratings for their ride-sharing partners to build trust and enhance the community. Implement a fair and transparent rating system.




Every day, thousands of people face the daunting task of finding an auto-rickshaw for their daily commute, whether it's to work, college, or commonly visited places. 

Their have been many more apps created for this pain point like ola uber  rapido etc

But AutoMate offers a lifeline. AutoMate eliminates this problem  by seamlessly connecting users heading to the same destination, making life easier for everyone.

our app AutoMate, fosters sustainability , eliminates long waits, and redefines daily commutes. 

AutoMate is about connecting people, cutting costs, and making each journey a memorable part of your day. 

hand over to soumya for the demo




### Future Scope:

#### Advanced Filtering :

currenlty doesnt not account for prefrences

Implement advanced filtering options that allow users to refine their matched ride-sharing partners based on their preferences like filtering by age, gender, ratings, and even shared interests or commuting habits


#### In-App Chat and Communication:
to chat with their matched mate before accepting

#### User Ratings and Reviews:
so users can rate their mates
