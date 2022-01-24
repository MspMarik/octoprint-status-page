from distutils.command.config import config


port = input("Enter a port to host the webserver on: ")
print("You entered: " + port)

apikey = input("Enter the API key for OctoPrint: ")
print("You entered: " + apikey)

f = open("config.js", "w")
f.write('var config = {port: ' + port + ',apikey: "' + apikey + '",}')
f.close();

print("Done!")