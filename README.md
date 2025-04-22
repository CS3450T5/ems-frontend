Frontend
https://github.com/CS3450T5/ems-frontend
Server location: http://aspire-likitu-r730xd.bluezone.usu.edu:8000/

Stack
Our frontend stack consists of Typescript, React, and MaterialUI for out-of-the-box React components. Our dashboard is primarily based off of a template from MaterialUI.

Components
We currently have 4 components that are working with data. On the main page, the Max Energy gauge, Energy Sources pie chart, and Total Usage chart are all using real data. The other components on that page are placeholders for future use. On the devices page (see side menu), the devices table is pulling in a set of real devices with real data. The device usage breakdown chart below is a placeholder for future use and currently has static data.

Integration
All API requests to our backend are streamlined through the fetchData function defined in the api.ts file. This function makes use of the axios library for extra security as opposed to Javascript’s built in fetch function. In each respective component file, the data is collected through this fetchData function, and then the state is updated. The state values are then used to update the values in the components accordingly.

Future Additions
The development pattern was set up in a way that makes it very easy to integrate future data visualization, charts, and graphs. By following the integration pattern stated above, new react components can be utilized along with new APIs on the backend to expand the scope of the overall dashboard capabilities.

Backend
https://github.com/CS3450T5/ems-api
https://github.com/CS3450T5/ems-rtd-api

Routes
We have a total of 6 current routes set up.
- Device total: gets the total usage for a device over time
- Energy Cost: Gets a list of energy prices from the database over the given time period
- General Energy Sources: Gives energy source overview information from solar and batteries
- Energy Sources: Gets specific data about a specific device
- Max-energy: Get percentage of total energy used
- Total Usage: Get total usage for given time period

Tech Stack
We ended up using flask with flask_restx as the libraries to make the backend, as well as peewee as an ORM for database access. These made getting the MVP done much more efficient because of python’s ease of use and the specialized libraries we used.

Infrastructure
https://github.com/CS3450T5/ems-infra
Server: aspire-likitu-r730xd.bluezone.usu.edu
Database: Mariadb
Dockerized frontend and backend, with an additional docker container for getting energy prices. Will integrate well in a microservices ecosystem
