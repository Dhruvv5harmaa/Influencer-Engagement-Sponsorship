from flask_restful import Resource,Api,reqparse,marshal, fields
from .models import StudyResource,db
from sqlalchemy import or_
from flask import jsonify
from flask_security import auth_required,roles_required,current_user


api=Api(prefix='/api') #all api will start with the prefix /api
parser = reqparse.RequestParser()
parser.add_argument('topic',type=str,help='Topic is required and should be a string',required=True)
parser.add_argument('description',type=str,help='Description is required and should be a string',required=True)
parser.add_argument('resource_link',type=str,help='Resource Link is required and should be a string',required=True)

# Overrriding a Class to create a custom field
class Creator(fields.Raw):
    def format(self,user):
        return user.email


study_material_fields={
    'id':fields.Integer,
    'topic':fields.String,
    'description':fields.String,
    'resource_link':fields.String,
    'is_approved':fields.Boolean,
    'creator':Creator
}

class StudyMaterial(Resource):
    # @marshal_with(study_material_fields)
    @auth_required("token")
    def get(self):
        # all_study_material=StudyResource.query.all() #This will gove all the study resource objects 
        # study_resources=None
        if "inst" in current_user.roles:  
            #If user is  a instructor then 
            #show all Study Resources
             study_resources=StudyResource.query.all()
           
        else:
             study_resources=StudyResource.query.filter(
                or_(StudyResource.is_approved==True,StudyResource.creator==current_user)).all()

        if len(study_resources)>0:
            return marshal(study_resources,study_material_fields)   
        else:
            return {"message":"No Resource Found"},404 
        # return all_study_material

        # if len(all_study_material)>0:
        #     return{"message":"No resource found"},404
        # return all_study_material
    
    @auth_required("token")
    @roles_required("stud")
    def post(self):
        args=parser.parse_args()
        # study_resource=StudyResource(**args) #unpack the args
        study_resource=StudyResource(topic=args.get("topic"),description=args.get("description")
                                     ,resource_link=args.get("resource_link"),creator_id=current_user.id)
        db.session.add(study_resource)
        db.session.commit()
        return {"message":"Study Resource Created"}

api.add_resource(StudyMaterial,'/study_material')    