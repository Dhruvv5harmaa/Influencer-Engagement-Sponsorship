from flask import current_app as app,jsonify, request,render_template
from flask_security import auth_required, roles_required
from werkzeug.security import check_password_hash
from .models import User,db,StudyResource
from flask_restful import marshal,fields
from .sec import datastore

@app.get('/')
def home():
    return render_template("index.html")

@app.get('/admin')
@auth_required("token")
@roles_required("admin")
def admin():
    return "Welcome Admin"


@app.get('/activate/instructor/<int:inst_id>')
@auth_required("token")
@roles_required("admin")
def activate_instructor(inst_id):
    instructor=User.query.get(inst_id)
    if not instructor or "inst" not in instructor.roles:
        return jsonify({"message":"Instructor not found"}),404
    instructor.active=True
    db.session.commit()
    return jsonify({"message":"User Activated"})


@app.post('/user-login')
def user_login():
    data=request.get_json()
    email=data.get('email')
    if not email:
        return jsonify({"message":"Email not provided"}),400
    
    user=datastore.find_user(email=email)

    if not user:
        return jsonify({"message":"User not found"}),404
    
    if check_password_hash(user.password,data.get("password")):
        return jsonify({"token":user.get_auth_token(),"email":user.email,"role":user.roles[0].name})
    else:
        return jsonify({"message":"Wrong Password"}),400
    



user_fields={
    "id":fields.Integer,
    "email":fields.String,
    "active":fields.Boolean
}   
@app.get('/users')
@auth_required("token")
@roles_required("admin")
def all_users():
    users=User.query.all()
    if len(users)==0:
        return jsonify({"message":"No User Found"}),404
    return marshal(users,user_fields)


@app.get('/study-resource/<int:id>/approve')
@auth_required("token")
@roles_required("inst")
def resource(id):
    study_resource=StudyResource.query.get(id)
    if not study_resource:
        return jsonify({"message": " Resource Not Found" }),404
    
    study_resource.is_approved =True
    db.session.commit()
    return jsonify({"message":"Approved"})