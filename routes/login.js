/**
 * New node file
 */
var mq_client = require('../rpc/client');

exports.checkLogin = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	var username = req.param("username");
	var password = req.param("password");
	console.log(password +" is the object");
	var msg_payload = { "username": username, "password": password };
	
	console.log("In POST Request = UserName:"+ username+" "+password);
	
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				req.session.username=username;
				res.send({"login":"Success"});
			}
			else {    
				
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
		}  
	});
};
//SignUp New User! Checks if User already Exists
exports.signUp = function(req,res){
	// These two variables come from the form on
	// the views/login.hbs page
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var username = req.param("user");
	var password = req.param("pass");
	console.log(password +" is the object");
	var json_responses;
var msg_payload = {"firstname":firstname,"lastname":lastname,"username": username, "password":password};
	
	console.log("In POST Request = UserName:"+ username+" "+password);
	
	
	mq_client.make_request('signup_queue',msg_payload, function(err,results){
			if (results) {
				// Checks Whether User is Already Signed Up
				
				json_responses = {"statusCode" : 200};
				console.log("3"+json_responses)
				res.send(json_responses);

			} else {json_responses = {"statusCode" : 200};
			console.log("23"+json_responses)
			res.send(json_responses);
			}
		});
	
};
//Fetching Data from DAtabase for Home page
exports.fetchForHomePage = function(req,res)
{var json_responses={};
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{var msg_payload = { "username": req.session.username};
		
			
			
			mq_client.make_request('fetch_queue',msg_payload, function(err,user){
				if (user) {
					// if data fetched from database
					console.log("1"+user);
					json_responses = {"username" : user.username,"firstname":user.firstname,"lastname":user.lastname};
					console.log("2"+json_responses)
					res.send(json_responses);

				} else {
					
						json_responses = {"error" : "Encounter Problem while fetching Data"};
						res.send(json_responses);}
			});
		
	}		
	
	else
	{
		res.redirect('/');
	}
};
//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{username:req.session.username});
	}
	else
	{
		res.redirect('/');
	}
};

//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	req.session.destroy();
	res.redirect('/');
};

