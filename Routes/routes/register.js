import {userModal} from "../../Database/Modal.js";

const register = async (req,res) => {
    const {userId,email,settings} = req.body;
    let setting;
    if(settings)
        setting = settings;
    else
        setting = {
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
    await userModal.create({userId:userId,settings:setting})
    return res.status(201).json({statusCode:201,status:"Ok",message:"user registered successfully"})
}

export default register;