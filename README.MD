## LANDLORD API DOCUMENTATION

### API END POINTS AND RESPONSES 

__BASEURL__ : https://landlord-api-2.herokuapp.com/api/


To Add a new User .

POST REQUEST TO : BASEURL/user/register

PARAMETERS : name- Persons Name
             email- persons Email =
             password- persons password 
             phoneNumber - persons PhoneNumber 

To Login as a User .

POST REQUEST TO : BASEURL/user/login

PARAMETERS : email- persons Email =
             password- persons password 

RESPONSE : JWT Token 
             
To Add a new Admin  .

POST REQUEST TO : BASEURL/admin/register

PARAMETERS : name- Persons Name
             email- persons Email =
             password- persons password 

RESPONSE : 

To login as Admin  .

POST REQUEST TO : BASEURL/admin/login

PARAMETERS : email- persons Email 
             password- persons password 

RESPONSE : JWT Token 

AUTHENTICATED ROUTES
===========================
for Authenticated Links : send recieved Token back through headers as "Authorization:token" to authenticate 

ADD ASSETS  =
POST REQUEST TO BASERURL/admin/addassets;

PARAMS: state: State of Asset
        address: Address of Asset
        country: Country of Asset
        price: Price of Rent 

RESPONSE : 

ALL RENTS   =
GET REQUEST TO BASERURL/admin/allrents;

PARAMS: state: State of Asset
        address: Address of Asset
        country: Country of Asset
        price: Price of Rent 

RENT ASSETS    =
GET REQUEST TO BASERURL/user/rentasset;

PARAMS: assetID: ID of Assets 
        duration: Time of rent  
        rentReason: where you are renting 
        occupation: job 

RESPONSE  : 

ALL ASSETS    =
GET REQUEST TO BASERURL/api/user/assets;

PARAMS: state: State of Asset
        address: Address of Asset
        country: Country of Asset
        price: Price of Rent 

RESPONSE : assets": [
                {
                "_id": "5ca372c0b156551da0d239fe",
                "name": "duplex",
                "state": "lagos",
                "address": "lekki",
                "country": "Nigeria",
                "price": "5000000",
                "createdAt": "2019-04-02T14:33:36.051Z",
                "updatedAt": "2019-04-02T14:33:36.051Z",
                "__v": 0
                }
        ]


