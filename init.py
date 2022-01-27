import sys


# apikey = input("Enter the API key for OctoPrint: ")
# print("You entered: " + apikey)

apikey = sys.argv[1]

url = sys.argv[2]

f = open("config.js", "w")
f.write('var config = {apikey: "' + apikey + '", cameraUrl: "' + url + '",}')
f.close();

print("Done!")