from flask import Flask, jsonify , request
from flask_cors import CORS
import pymongo
from bson.objectid import ObjectId
import uuid



app = Flask(__name__)
CORS(app)
mongo = pymongo.MongoClient("mongodb://localhost:27017/")
db  = mongo['todos']
todoList = db['todoList']


@app.route("/todos", methods=['POST'])
def addTodos():
	data = request.get_json()
	todoID = uuid.uuid4()
	todo =  data['todos']
	completed =  "false"
	mytodo = {"todoID":todoID,"todo": todo,"completed":completed}
	if not data:
		return jsonify({"message": "No Input Data Sent"})
	query = todoList.insert_one(mytodo).inserted_id


	return jsonify({"Result":"Todos Add"})


@app.route("/todos", methods=["GET"])
def getAllTodos():

	output = []
	for todo in todoList.find():
		output.append({"ID": f"{todo['_id']}","todoID":todo['todoID'],"todo":todo['todo'], "completed": todo['completed']})
	return jsonify({"Result":output})




@app.route("/todos/<ID>", methods=['PATCH'])
def markCompleted(ID):

	data =  request.get_json()
	completed =  "true"
	query = todoList.update_one({'_id':ObjectId(ID)}, {'$set': {"completed":completed}} )
	if query:
		output = "Todo Completed"
	else: 
		output = "Record Not Found"
	return jsonify({'Result': output})



@app.route("/todos/<ID>", methods=["DELETE"])
def deleteTodo(ID):
	query = todoList.delete_one({"_id":ObjectId(ID)})
	if query:
		output = "Todo Deleted"
	else:
		output = "Record Not Found"
	return jsonify({"Result": output})