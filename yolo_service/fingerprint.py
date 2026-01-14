"""
Image Fingerprinting Module for Duplicate Detection

Uses perceptual hashing (pHash) for fast, CPU-friendly duplicate detection.
pHash is robust to minor image changes like compression, resizing, and color adjustments.

Performance: ~1-5ms per image on CPU (no GPU required)
"""

import io
import logging
from PIL import Image
import imagehash

logger = logging.getLogger(__name__)

# Hamming distance threshold for considering images as duplicates
# 0 = exact match, <5 = very similar, <10 = similar
DUPLICATE_THRESHOLD = 5


def compute_phash(image_bytes: bytes) -> str:
    """
    Compute perceptual hash of an image.
    
    Args:
        image_bytes: Raw image bytes
        
    Returns:
        16-character hex string representing the pHash
    """
    try:
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB if necessary (pHash works best on RGB)
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Compute perceptual hash (64-bit, returned as 16 hex chars)
        phash = imagehash.phash(image)
        
        return str(phash)
        
    except Exception as e:
        logger.error(f"Failed to compute pHash: {e}")
        return None


def hamming_distance(hash1: str, hash2: str) -> int:
    """
    Compute Hamming distance between two pHash strings.
    
    Args:
        hash1: First pHash (16-char hex string)
        hash2: Second pHash (16-char hex string)
        
    Returns:
        Number of differing bits (0 = identical, lower = more similar)
    """
    try:
        h1 = imagehash.hex_to_hash(hash1)
        h2 = imagehash.hex_to_hash(hash2)
        return h1 - h2  # imagehash overloads subtraction to return Hamming distance
    except Exception as e:
        logger.error(f"Failed to compute Hamming distance: {e}")
        return 64  # Return max distance on error


def is_duplicate(new_hash: str, existing_hashes: list[str], threshold: int = DUPLICATE_THRESHOLD) -> tuple[bool, str | None]:
    """
    Check if a new image hash matches any existing hashes.
    
    Args:
        new_hash: pHash of the new image
        existing_hashes: List of existing pHash strings to compare against
        threshold: Maximum Hamming distance to consider as duplicate
        
    Returns:
        Tuple of (is_duplicate: bool, matching_hash: str | None)
    """
    if not new_hash or not existing_hashes:
        return False, None
    
    for existing_hash in existing_hashes:
        distance = hamming_distance(new_hash, existing_hash)
        if distance <= threshold:
            logger.info(f"🔄 Duplicate detected! Hamming distance: {distance} (threshold: {threshold})")
            return True, existing_hash
    
    return False, None
