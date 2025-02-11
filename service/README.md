# Points-Tracker-Service
The project is aimed towards solving transaction points per payer in real time.


# OVERVIEW
The project is aimed towards solving transaction points per payer in real time.
The points should be updated for each user sorted by the first timestamp in the transactions.
The balance for each payer should be updated accordingly once the points are spend.
The user must be able to view their balance of points at any given time.

# TECHNOLOGIES USED
nest v11.0.2

# REQUIREMTNS TO RUN THE PROJECT
1. node v20 or higher
2. Compiler - for best results, use Visual Studio Code
3. Postman - to send the requests
4. git - to clone the repository and make sure you are on the right branch.

# INSTUCTIONS TO RUN THE PROJECT
1. In order to clone the project, you can use the the url from the github or you can download this project as a zip as well.
2. In order to clone the project using git, make sure you have git installed on the computer, then git clone {URL_from_the_git}
3. Once you have cloned the project, the points-tracker-service would be have one folder and two files i.e. service
folder, postman-collection JSON file and the README.md.
4. Before we jump into starting the project, make sure you have Postman installed and import the collection to your postman.
The postman collection has all the routes and their saved examples.
5. Once you are able to import the postman collection, then we can jump in to start the project.
6. Now, in order to start the project, make sure you have some compiler installed. I will be instructing you in terms of VS Code.
7. Open VS Code and then click "File" at the top left side of the window and then "Open Folder"
8. Select the folder for our service and open it.
9. Once the folder is open,Press CMD+J for MAC or Ctrl+J for Windows/Linux to open up the Terminal.
10. Once the terminal is open, make sure you are in the service directory in the terminal. If not, you can go to it by "cd service" command. 
11. It is better to use "sudo" with every commmand in order to not face any permission issues.
12. Now check if you are on the master branch or not, you can use "git status" cmd to locate the branch you are in. If you are in some other branch, type "git checkout master" and press enter.
13. Now, first we need to install all the modules, in order for the project to run, for that, type "sudo npm install".
14. The above command will install all the dependencies required to run the project.
15. The next step would be to simply run the project by "sudo npm start".
16. If you do not see any issues, your project should be started now and you will be able to see the logs on your terminal
17. If you see any issues regarding that the PORT is not available to use, simply go the main.ts file inside the src folder, change 3000 on line number 8 to anyother PORT and start the project again using "sudo npm start".
18. Open the Postman and start using the APIs to send requests.


# PROJECT STRUCTURE
1. The project has only one module named transactions. All of the routes are defined inside it.
2. The transactions module contains dto folder, which is used for validating the request structure being received.
3. It has the controller file as well, where all the routes are defined
5. The service file contains all the logic for each route.

# ROUTES
1. transaction/balance - GET
This returns the current remaining points for each payer

2. transaction/balanceInDetail - GET
This returns the points for each payer depending on how they were added. Simply, this is the detailed information for the balance

3. transaction/totalBalance
This returns the total balance present for the user through adding all the points available through the transactions

4. transaction/spendPoints - POST
This expects some points that is going to be deducted from the payers depending on our logic

5. transaction/addTransaction - POST
This expects transactions inside an array that needs to be added. The fileds inside the array are required
// You can view more details regarding the routes in the postman collection


# IMPLEMENTATION
For the sake of keeping things simple, we have not implemented the database layer, so all of the information will be removed if the project is re-started or stopped.
All other routes serves simple purpose, getting details or adding transactions except the spendPoints, which we will discuss here.
## Spend Points Implementations
The implementation is simple and straight forward, let me chop it down into some simple steps.
1. Check if transactions exist, only then move forward otherwise return response.
2. Check if the Spending Points are greater than the points available, if yes, return response.
3. Start a loop on the transactions available
4. Check if the current transaction points are +ve or -ve
### For +ve
1. Find out the amount that could be subtracted from the transaction points
2. Subtract the amount from the transaction points.
3. Subtract the amount from the points as well.
4. Assign how many points were subtracted/added according to the transaction payer in our spend pool
5. Update the balance
### For -ve
1. Find out the amount that needs to be added for the transaction points to make it 0
2. Add that amount to transaction points, to make it 0
3. Add the points with that amount, as this time, it was us giving away the amount from our pool
4. Assign how many points were subtracted/added according to the transaction payer in our spend pool
5. Update the balance.

