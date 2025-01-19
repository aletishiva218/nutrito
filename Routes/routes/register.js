import {userModal,nutrilizationModel} from "../../Database/Modal.js";

const register = async (req,res) => {
    let {userId,email,home,social,settings,timestamp} = req.body;
    if(!home) home = {}
    if(!social) social = {}
    if(!settings) settings = {
            "profile":{
        
                "section_1":{
                    
                    "avatar":"", 
                    "username":"",
                    "email":email,
                    "diataryIntake":{
                        "numb":0,
                        "type":"percentage"
                    },
                    "healthScore":{
                        "numb":0, 
                        "type":"percentage"
                    },
                    "nutrientDeficiencies":{"state":""},
                    
                   
                   
                    "weight":{
                        "numb":0,
                        "type":"kg"
                    },
                    "weightLoss":{
                        "numb":0,
                        "type":"kg"
                    },
                    "nutriScore":{
                        "numb":0,
                        "grade":"",
                        "type":"percentage"
                    },
                    "groups":[
                        {
                           "group":"group name"
                           
                        },{
                           "group":"group name"
                        }
                    ],
                "profileAccess":{
                    
                    "options":["Public","Private"],
                    "access":"Public"
                    
                }
           
             }
               
            },
        
            "scans":{
                "healthRating":{
                    "range":["",""],
                    "selected":""
                },
                "allergen Alert":true,
                "alternativeSuggestion":false,
                "balanacedMeal":false,
                "expiryAlert":false,
                "scanModeSettings":{
                    "range":["",""],
                    "selected":""
                    }
                
            },
        
        
            "settings":{
                "appSettings":{
                    "nutrientionSettings":{},
                    "themeAppearance":{},
                    "accuracy":{},
                    "supportedLanguage":{},
                    "storageManagement":{}
                },
        
                "access":{
                    "purchaseHistory":{},
                    "socialMediaIntegration":{},
                    "appUpdates":{},
                    "subscriptionManagement":{}, 
                    "dataUsage":{}
                },
        
                "services":{
                    "privacyPolicy":{},
                    "Feedback":{},
                    "termsOfService":{},
                    "appVersion":{}
                }
            },
        
            "goals":{
             "section1":{
                   "userGoalManagement":{
        
                    "goalCategories":{
                        "range":["",""],
                        "selected":""
        
                    },
                    "customGoals":{},
                    "Ai Recommendations":{},
                    
                },
                "foodProductAnalysis":{
                    "mlModel":{},
                    
                   
        
                },
                "foodProductConclusion":{ "goalAligmentReport":{},
                    "instantAlerts":{}}
        
             },
        
            "section2":{
                    "healthDataRecordingAndVisualization":{
                        "healthMericsTracking":{},
                        "habitInsights":{},
                        "periodicReports":{},
                        "integrationWithWearables":{}
                    },
                    "other":{
                        "recipeSuggestions":{},
                        "mealPlanning":{}
        
                    }
            }
            }
        }

        
       //delete after testing
    let userEmailExists = await userModal.findOne({"settings.profile.section_1.email":email})
    
    //delete after testing
    if(userEmailExists)
    {
        await nutrilizationModel.updateOne({userId:userEmailExists.userId},{$set:{userId:userId}})
        await userModal.updateOne({"settings.profile.section_1.email":email},{$set:{userId:userId,timestamp:timestamp}})
    }
    else
                {
                    await nutrilizationModel.create({userId:userId,data:[]})
                    await userModal.create({userId:userId,home:home,social:social,settings:settings,timestamp:timestamp})
                }
   
    return res.status(201).json({statusCode:201,status:"Ok",message:"user registered successfully"})
}

export default register;