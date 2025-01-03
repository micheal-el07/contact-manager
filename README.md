# Contact Manager - Talentlabs Project

Desc:
Contact manager is a backend system that allow user to add, view, edit and delete user's contacts.
Build using NodeJS, JavaScript, MongoDB Atlas as database and accessed by using REST API.

Goals
• Users can register for their account.
• Once registration is successful, users can login to their account and manage
their contacts.

• Users can create, update, delete, get all contacts or get a single contact which
they have created.
• Prevent users from managing contacts of different users.
• Users should have a valid access token to use the private endpoints.
• Proper error messages with status code should be provided to the users in case
of any error.
• Users password should not be stored as raw password in the Database.
• Provide users with a signed JWT access token on successful login to access
private endpoints.

To do:

1. User can register an account
2. User can login into the system
3. User can create a new contact
4. User can update a contact
5. User can get contacts
6. User can delete a contact
7. User cannot manage others contacts
8. Each endpoint have proper validation
9. Each error handled gracefully
10. Password is hashed
11. Give JWT upon successful login

API Endpoint:

/api/register:

(Public) POST : Registering new user for the system.


/api/login:

(Public) POST : Login into the system, token will be given for every successful login.


/api/user:

(Private) GET: Retrieve lists of all users

(Private) POST: 

(Private) UPDATE:

(Private) DELETE:


/api/contact:

(Private) GET: Retrieve all of the contacts

(Private) POST:

(Private) UPDATE:

(Private) DELETE:


/api/contact/id:

(Private) GET: Get all contacts for the specified ID

(Private) POST: 

(Private) UPDATE: Update the contacts of the specified ID

(Private) DELETE: Delete the contact of the specified ID
