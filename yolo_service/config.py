import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Base directory
BASE_DIR = Path(__file__).resolve().parent

# Model configuration
MODEL_PATH = os.getenv("MODEL_PATH", str(BASE_DIR / "weights" / "best.pt"))
CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", "0.5"))

# Server configuration
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

# CORS settings
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:3004",
    "http://127.0.0.1:3004",
]

# =============================================================================
# StreetSignSenseY12n Class Name Mapping
# Maps model class names to human-readable names and descriptions
# =============================================================================
CLASS_NAME_MAPPING = {
    # Forbidden/Prohibition Signs (forb_*)
    "forb_speed_over_5": {"name": "Speed Limit 5 km/h", "category": "regulatory", "description": "Maximum speed of 5 km/h allowed."},
    "forb_speed_over_10": {"name": "Speed Limit 10 km/h", "category": "regulatory", "description": "Maximum speed of 10 km/h allowed."},
    "forb_speed_over_20": {"name": "Speed Limit 20 km/h", "category": "regulatory", "description": "Maximum speed of 20 km/h allowed."},
    "forb_speed_over_30": {"name": "Speed Limit 30 km/h", "category": "regulatory", "description": "Maximum speed of 30 km/h allowed."},
    "forb_speed_over_40": {"name": "Speed Limit 40 km/h", "category": "regulatory", "description": "Maximum speed of 40 km/h allowed."},
    "forb_speed_over_50": {"name": "Speed Limit 50 km/h", "category": "regulatory", "description": "Maximum speed of 50 km/h allowed."},
    "forb_speed_over_60": {"name": "Speed Limit 60 km/h", "category": "regulatory", "description": "Maximum speed of 60 km/h allowed."},
    "forb_speed_over_70": {"name": "Speed Limit 70 km/h", "category": "regulatory", "description": "Maximum speed of 70 km/h allowed."},
    "forb_speed_over_80": {"name": "Speed Limit 80 km/h", "category": "regulatory", "description": "Maximum speed of 80 km/h allowed."},
    "forb_speed_over_90": {"name": "Speed Limit 90 km/h", "category": "regulatory", "description": "Maximum speed of 90 km/h allowed."},
    "forb_speed_over_100": {"name": "Speed Limit 100 km/h", "category": "regulatory", "description": "Maximum speed of 100 km/h allowed."},
    "forb_speed_over_110": {"name": "Speed Limit 110 km/h", "category": "regulatory", "description": "Maximum speed of 110 km/h allowed."},
    "forb_speed_over_120": {"name": "Speed Limit 120 km/h", "category": "regulatory", "description": "Maximum speed of 120 km/h allowed."},
    "forb_speed_over_130": {"name": "Speed Limit 130 km/h", "category": "regulatory", "description": "Maximum speed of 130 km/h allowed."},
    "forb_no_entry": {"name": "No Entry", "category": "regulatory", "description": "Entry prohibited into this road."},
    "forb_no_vehicles": {"name": "No Vehicles", "category": "regulatory", "description": "No vehicles allowed beyond this point."},
    "forb_no_trucks": {"name": "No Trucks", "category": "regulatory", "description": "Trucks prohibited on this road."},
    "forb_no_bicycles": {"name": "No Bicycles", "category": "regulatory", "description": "Bicycles not allowed on this road."},
    "forb_no_pedestrians": {"name": "No Pedestrians", "category": "regulatory", "description": "Pedestrians not allowed."},
    "forb_no_parking": {"name": "No Parking", "category": "regulatory", "description": "Parking prohibited in this area."},
    "forb_no_stopping": {"name": "No Stopping", "category": "regulatory", "description": "Stopping prohibited."},
    "forb_no_overtaking": {"name": "No Overtaking", "category": "regulatory", "description": "Overtaking/passing prohibited."},
    "forb_no_horn": {"name": "No Horn", "category": "regulatory", "description": "Use of horn prohibited."},
    "forb_no_left_turn": {"name": "No Left Turn", "category": "regulatory", "description": "Left turn prohibited."},
    "forb_no_right_turn": {"name": "No Right Turn", "category": "regulatory", "description": "Right turn prohibited."},
    "forb_no_u_turn": {"name": "No U-Turn", "category": "regulatory", "description": "U-turn prohibited."},
    
    # Warning Signs (warn_*)
    "warn_children": {"name": "Children Crossing", "category": "warning", "description": "School zone or children may be crossing ahead."},
    "warn_pedestrian": {"name": "Pedestrian Crossing", "category": "warning", "description": "Pedestrian crossing ahead."},
    "warn_bicycle": {"name": "Bicycle Crossing", "category": "warning", "description": "Bicycle crossing ahead."},
    "warn_traffic_light": {"name": "Traffic Light Ahead", "category": "warning", "description": "Traffic signals ahead. Be prepared to stop."},
    "warn_curve_left": {"name": "Curve Left", "category": "warning", "description": "Sharp curve to the left ahead."},
    "warn_curve_right": {"name": "Curve Right", "category": "warning", "description": "Sharp curve to the right ahead."},
    "warn_double_curve": {"name": "Double Curve", "category": "warning", "description": "Winding road with multiple curves ahead."},
    "warn_slippery": {"name": "Slippery Road", "category": "warning", "description": "Road may be slippery when wet."},
    "warn_bumpy": {"name": "Bumpy Road", "category": "warning", "description": "Rough or uneven road surface ahead."},
    "warn_roadwork": {"name": "Road Work Ahead", "category": "construction", "description": "Construction or maintenance work ahead."},
    "warn_crossroad": {"name": "Crossroad Ahead", "category": "warning", "description": "Intersection ahead."},
    "warn_roundabout": {"name": "Roundabout Ahead", "category": "warning", "description": "Roundabout/traffic circle ahead."},
    "warn_narrow": {"name": "Road Narrows", "category": "warning", "description": "Road width decreases ahead."},
    "warn_animal": {"name": "Animal Crossing", "category": "warning", "description": "Wild animals may cross the road."},
    "warn_general": {"name": "General Caution", "category": "warning", "description": "General warning - be alert for hazards."},
    "warn_steep": {"name": "Steep Hill", "category": "warning", "description": "Steep incline ahead."},
    
    # Mandatory Signs (mand_*)
    "mand_straight": {"name": "Go Straight", "category": "regulatory", "description": "Proceed straight ahead only."},
    "mand_left": {"name": "Turn Left", "category": "regulatory", "description": "Mandatory left turn ahead."},
    "mand_right": {"name": "Turn Right", "category": "regulatory", "description": "Mandatory right turn ahead."},
    "mand_straight_left": {"name": "Go Straight or Left", "category": "regulatory", "description": "Proceed straight or turn left."},
    "mand_straight_right": {"name": "Go Straight or Right", "category": "regulatory", "description": "Proceed straight or turn right."},
    "mand_keep_left": {"name": "Keep Left", "category": "regulatory", "description": "Keep to the left of the obstacle."},
    "mand_keep_right": {"name": "Keep Right", "category": "regulatory", "description": "Keep to the right of the obstacle."},
    "mand_roundabout": {"name": "Roundabout", "category": "regulatory", "description": "Enter roundabout and follow direction."},
    
    # Priority Signs
    "stop": {"name": "Stop", "category": "regulatory", "description": "Come to a complete stop at the line."},
    "yield": {"name": "Yield", "category": "regulatory", "description": "Give way to traffic on the main road."},
    "priority_road": {"name": "Priority Road", "category": "regulatory", "description": "You are on a priority road."},
    "end_priority": {"name": "End of Priority", "category": "regulatory", "description": "End of priority road."},
    
    # Information/Guide Signs
    "info_parking": {"name": "Parking", "category": "guide", "description": "Parking area available."},
    "info_hospital": {"name": "Hospital", "category": "guide", "description": "Hospital nearby."},
    "info_gas": {"name": "Gas Station", "category": "guide", "description": "Gas/fuel station ahead."},
    
    # End of restriction signs
    "end_speed": {"name": "End of Speed Limit", "category": "guide", "description": "Speed restriction ends."},
    "end_no_overtaking": {"name": "End of No Overtaking", "category": "guide", "description": "Overtaking now permitted."},
}

def get_pretty_name(model_class_name: str) -> dict:
    """Get human-readable name and info for a model class."""
    if model_class_name in CLASS_NAME_MAPPING:
        return CLASS_NAME_MAPPING[model_class_name]
    
    # Fallback: try to make the name readable
    pretty = model_class_name.replace("_", " ").replace("forb ", "No ").replace("warn ", "Warning: ").replace("mand ", "").title()
    return {
        "name": pretty,
        "category": get_category(model_class_name),
        "description": f"Traffic sign: {pretty}"
    }

def get_category(class_name: str) -> str:
    """Determine sign category from class name."""
    name_lower = class_name.lower()
    
    # Check in mapping first
    if class_name in CLASS_NAME_MAPPING:
        return CLASS_NAME_MAPPING[class_name]["category"]
    
    # Fallback keyword matching
    if "forb" in name_lower or "stop" in name_lower or "yield" in name_lower or "mand" in name_lower:
        return "regulatory"
    elif "warn" in name_lower:
        return "warning"
    elif "info" in name_lower or "end" in name_lower:
        return "guide"
    elif "work" in name_lower or "construction" in name_lower:
        return "construction"
    
    return "regulatory"  # Default category

