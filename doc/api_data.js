define({ "api": [
  {
    "type": "post",
    "url": "v1/roles",
    "title": "Create Roles",
    "name": "Create_Role",
    "group": "Roles",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the role</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/roleController.js",
    "groupTitle": "Roles"
  },
  {
    "type": "post",
    "url": "v1/users",
    "title": "Create User",
    "name": "Create_User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "confirm_password",
            "description": "<p>Confirm user's Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role_id",
            "description": "<p>Role id of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "v1/users/:id",
    "title": "Request User information",
    "name": "Get_User_By_Id",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role_id",
            "description": "<p>Role id of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "v1/users",
    "title": "Request User information",
    "name": "Get_Users",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "first_name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "last_name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number of the user</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role_id",
            "description": "<p>Role id of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "v1/users/login",
    "title": "Login User information",
    "name": "Login_User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Password of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "type": "put",
    "url": "v1/users/:id",
    "title": "Update User information",
    "name": "Update_User",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "first_name",
            "description": "<p>First name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "last_name",
            "description": "<p>Last name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>Username of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Password of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Email address of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "phone_number",
            "description": "<p>Phone number of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "role_id",
            "description": "<p>Role id of the user</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./controllers/userController.js",
    "groupTitle": "Users"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./doc/main.js",
    "group": "_home_markangelo_Desktop_backend_projects_criminal_watch_doc_main_js",
    "groupTitle": "_home_markangelo_Desktop_backend_projects_criminal_watch_doc_main_js",
    "name": ""
  }
] });
