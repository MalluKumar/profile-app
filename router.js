var Profile = require('./profile.js');
var renderer = require('./renderer.js');
var queryString = require('querystring');

var contentType = { 'Content-Type': 'text/html' };

function homeRoute(request, response) {
    if (request.url === "/") {
        if (request.method.toLowerCase() === "get") {
            response.statusCode = 200;
            response.writeHead(200, contentType);
            renderer.view("header.html", {}, response);
            renderer.view("search.html", {}, response);
            renderer.view("footer.html", {}, response);
            response.end();
        } else {
            request.on("data", function (postBody) {
                var query = queryString.parse(postBody.toString());
                response.writeHead(303, {"Location" : "/" + query.username});
                response.end();
            });
        }
    }
}

function userRoute(request, response) {
    const userName = request.url.replace("/", "");
    if (userName.length > 0) {
        if (response.statusCode === 200) {
            response.writeHead(200, contentType);
            renderer.view("header.html", {}, response);

            var studentProfile = new Profile(userName);

            studentProfile.on("end", function (profileJSON) {
                var studentRecords = {
                    avatarURL: profileJSON.gravatar_url,
                    userName: profileJSON.profile_name,
                    badges: profileJSON.badges.length,
                    javascriptPoints: profileJSON.points.JavaScript
                }
                renderer.view("profile.html", studentRecords, response);
                renderer.view("footer.html", {}, response);
                response.end();
            });

            studentProfile.on("error", function (error) {
                renderer.view("error.html", { errorMessage: error.message }, response);
                renderer.view("search.html", {}, response);
                response.end();
            });
        }
    }
}

module.exports.homeRoute = homeRoute;
module.exports.userRoute = userRoute;