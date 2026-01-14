from datasets import load_dataset
import os

def download_signwise_dataset():
    print("Downloading AlessandroFerrante/StreetSignSet dataset...")
    try:
        # Load the dataset
        ds = load_dataset("AlessandroFerrante/StreetSignSet")
        
        # Define output directory
        output_dir = os.path.join(os.path.dirname(__file__), "dataset")
        os.makedirs(output_dir, exist_ok=True)
        
        print(f"Saving dataset to {output_dir}...")
        # Save to disk
        ds.save_to_disk(output_dir)
        
        print("\nDataset downloaded successfully!")
        print(f"Location: {output_dir}")
        print("\nDataset Structure:")
        print(ds)
        
    except Exception as e:
        print(f"Error downloading dataset: {e}")

if __name__ == "__main__":
    download_signwise_dataset()
