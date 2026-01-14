"""
Download pre-trained traffic sign detection model from HuggingFace.

APPROVED MODEL: StreetSignSenseY12n
- 63 traffic sign classes (international coverage)
- YOLO12 Nano architecture (latest, fast, accurate)
- Source: https://huggingface.co/AlessandroFerrante/StreetSignSenseY12n
"""

import os
import sys
from pathlib import Path

# Add huggingface_hub to requirements if needed
try:
    from huggingface_hub import hf_hub_download, list_repo_files
except ImportError:
    print("Installing huggingface_hub...")
    os.system(f"{sys.executable} -m pip install huggingface_hub")
    from huggingface_hub import hf_hub_download, list_repo_files

WEIGHTS_DIR = Path(__file__).parent / "weights"
WEIGHTS_DIR.mkdir(exist_ok=True)

# Model options - StreetSignSenseY12n is the approved choice
MODEL_OPTIONS = [
    {
        "repo_id": "AlessandroFerrante/StreetSignSenseY12n",
        "filename": None,  # Will search for .pt file
        "description": "⭐ APPROVED - StreetSignSenseY12n (63 international classes, YOLO12 Nano)"
    },
    {
        "repo_id": "AlessandroFerrante/StreetSignSenseY12s",
        "filename": None,
        "description": "Fallback - StreetSignSenseY12s (63 classes, YOLO12 Small)"
    },
]

def download_model():
    """Try to download model from available sources."""
    target_path = WEIGHTS_DIR / "best.pt"
    
    if target_path.exists():
        print(f"✅ Model already exists at {target_path}")
        return True
    
    for option in MODEL_OPTIONS:
        print(f"\n🔍 Trying: {option['description']}")
        print(f"   Repository: {option['repo_id']}")
        
        try:
            # List files in repo to verify it exists
            files = list_repo_files(option['repo_id'])
            print(f"   Found {len(files)} files in repo")
            
            # Find the model file
            model_files = [f for f in files if f.endswith('.pt')]
            if not model_files:
                print(f"   ⚠️ No .pt files found in repo")
                continue
            
            # Use first .pt file found
            filename = model_files[0]
            print(f"   📥 Downloading: {filename}")
            
            downloaded_path = hf_hub_download(
                repo_id=option['repo_id'],
                filename=filename,
                local_dir=str(WEIGHTS_DIR),
                local_dir_use_symlinks=False
            )
            
            # Rename to best.pt if needed
            downloaded = Path(downloaded_path)
            if downloaded.name != "best.pt":
                final_path = WEIGHTS_DIR / "best.pt"
                downloaded.rename(final_path)
                print(f"   📁 Renamed to: {final_path}")
            
            print(f"\n✅ Successfully downloaded model!")
            print(f"   Location: {WEIGHTS_DIR / 'best.pt'}")
            return True
            
        except Exception as e:
            print(f"   ❌ Failed: {e}")
            continue
    
    print("\n❌ Could not download any model. Please download manually:")
    print("   1. Go to https://huggingface.co/keremberke/yolov8s-traffic-sign-detection")
    print("   2. Download the .pt file")
    print(f"   3. Save it to: {WEIGHTS_DIR / 'best.pt'}")
    return False

if __name__ == "__main__":
    print("=" * 60)
    print("SignWise AI - Traffic Sign Model Downloader")
    print("=" * 60)
    
    success = download_model()
    
    if success:
        print("\n🚀 You can now start the YOLO service:")
        print("   python main.py")
    else:
        sys.exit(1)
