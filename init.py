from distutils.command.config import config


apikey = input("Enter the API key for OctoPrint: ")
print("You entered: " + apikey)

f = open("config.js", "w")
f.write('var config = {apikey: "' + apikey + '",}')
f.close();

print("Done!")