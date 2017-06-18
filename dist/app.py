from pymongo import MongoClient
from bson.objectid import ObjectId
from flask import Flask,render_template,jsonify,json,request

client = MongoClient('localhost:27017')
db = client.MachineData
application = Flask(__name__)

@application.route('/')
def showMachineList():
    return render_template('index.html')

@application.route("/addMachine",methods=['POST'])
def addMachine():
    try:
        json_data = request.json['info']
        deviceName = json_data['device']
        ipAddress = json_data['ip']
        userName = json_data['username']
        password = json_data['password']
        portNumber = json_data['port']

        db.Machines.insert_one({
            'device':deviceName,'ip':ipAddress,'username':userName,'password':password,'port':portNumber
            })
        return jsonify(status='OK',message='inserted successfully')

    except Exception as e:
        return jsonify(status='ERROR',message=str(e))
    
@application.route("/getMachineList",methods=['POST'])
def getMachineList():
    try:
        machines = db.Machines.find()
        
        machineList = []
        for machine in machines:
            print(machine)
            machineItem = {
                    'device':machine['device'],
                    'ip':machine['ip'],
                    'username':machine['username'],
                    'password':machine['password'],
                    'port':machine['port'],
                    'id': str(machine['_id'])
                    }
            machineList.append(machineItem)
    except Exception as e:
        return str(e)
    return json.dumps(machineList)

if __name__ == "__main__":
    application.run(host='0.0.0.0')