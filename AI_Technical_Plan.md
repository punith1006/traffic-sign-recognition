# AI Service Technical Strategy & Implementation Plan

## 1. Core AI Architecture Decision

**Decision**: Hybrid Approach (Cloud-Primary + On-Device Fallback Strategy)

### **Primary Engine: Google Gemini 1.5 Flash**
- **Role**: Main recognition engine for the MVP.
- **Why**: 
  - **State-of-the-Art Accuracy**: Multimodal capabilities understand context (e.g., distinguishing a "Stop" sign from a "Stop Ahead" warning text).
  - **Cost Effective**: ~$0.075 per 1 million tokens (effectively free for MVP scale).
  - **Zero Training**: No need to collect thousands of images to start. It works "zero-shot" out of the box.
  - **Speed**: Optimized for high-volume, low-latency tasks (<1s response).

### **Secondary Engine (Future V2): Custom Lightweight CNN**
- **Role**: Offline fallback and ultra-fast pre-filtering.
- **Model**: **YOLOv8-Nano** or **EfficientNet-B0**.
- **Why**: Can run directly on the user's phone (via TensorFlow.js) without internet, preserving data privacy and working in dead zones.

---

## 2. Dataset Strategy (Where to get the data?)

Since we are building for the **US Market** (Primary) and **Global** (Secondary), we will specific datasets for validation and future fine-tuning.

### **Recommended Datasets**

1.  **LISA Traffic Sign Dataset (US Focus)** 🇺🇸
    *   **Source**: Laboratory for Intelligent and Safe Automobiles (UCSD).
    *   **Details**: ~6,610 frames of 47 US sign types.
    *   **Use Case**: Essential for validating the model on *American* signs (rectangular speed limits, yellow diamond warnings) which differ from European standards.
    *   **Access**: [Download Link](http://cvrr.ucsd.edu/LISA/lisa-traffic-sign-dataset.html) or Kaggle mirrors.

2.  **GTSRB (German Traffic Sign Recognition Benchmark)** 🇩🇪
    *   **Source**: Institut für Neuroinformatik.
    *   **Details**: 50,000+ images, industry standard.
    *   **Use Case**: Excellent for learning "traffic sign features" (shapes, reflectivity) generally, even if specific symbols differ.
    *   **Access**: [Official Site](https://benchmark.ini.rub.de/gtsrb_news.html).

3.  **Mapillary Traffic Sign Dataset** (Global) 🌍
    *   **Source**: Mapillary (Meta).
    *   **Details**: 100,000+ images from all over the world.
    *   **Use Case**: Great for "wild" conditions (snow, rain, bad angles). *Note: Commercial license required for paid products, fine for research/MVP.*

---

## 3. Technology Stack & Resource Requirements

### **Deployment Option A: Student / Development Mode (Zero Cost) 🎓**
*Perfect for your laptop and student budget.*

*   **Service**: Node.js or Python backend running locally on your laptop.
*   **Infrastructure**: 
    *   **Compute**: Your Laptop CPU (Intel/AMD/Mac) - **NO GPU REQUIRED**.
    *   **AI Engine**: Google Cloud Vertex AI / Gemini API (Free Tier).
    *   **Cost**: **$0.00**. You can build the entire project using the free credit and free tier quotas.
*   **Limits**: 
    *   Gemini Free Tier allows ~15 requests per minute (RPM).
    *   This is MORE than enough for testing, demos, and building the project.

### **Deployment Option B: Free Cloud Hosting (Optional)**
*If you want to show it to friends.*

*   **Frontend**: Vercel (Hobby Tier - Free).
*   **Backend**: Render or Railway (Free Tiers).
*   **Database**: Supabase / Neon (Free Tier PostgreSQL).

### **Deployment Option C: Custom Model Hosting (Self-Hosted) ⚠️**
*NOT Recommended for your current setup.*

*   **Service**: Python (FastAPI) with PyTorch/TensorFlow.
*   **Infrastructure**: AWS EC2 with GPU.
*   **Why Avoid**: Expensive ($100+/mo) and requires complex DevOps.
*   **Stick to Option A** for this project!
*   **Infrastructure**:
    *   **Compute**: AWS EC2 instances (e.g., `g4dn.xlarge`).
*   **Resource Requirements**:
    *   **GPU**: NVIDIA T4 (16GB VRAM) recommended for fast inference.
    *   **RAM**: 8GB+.
*   **Estimated Cost**: ~$100-$300/month (Expensive for MVP).

---

## 4. Implementation Steps (The "How-To")

1.  **Setup Google AI Studio**:
    *   Get API Key for Gemini 1.5 Flash.
    *   Create a system prompt: *"You are an expert traffic safety AI. Identify this traffic sign from the image. Return JSON with: name, category (Warning/Regulatory), user_explanation, and driving_action."*

2.  **Integration (Node.js Example)**:
    ```javascript
    const { GoogleGenerativeAI } = require("@google/generative-ai");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    async function identifySign(imageBuffer) {
      const prompt = "Identify this US traffic sign. Return JSON.";
      const imagePart = {
        inlineData: { data: imageBuffer.toString("base64"), mimeType: "image/jpeg" },
      };
      const result = await model.generateContent([prompt, imagePart]);
      return result.response.text();
    }
    ```

3.  **Validation**:
    *   Download 100 random images from the **LISA dataset**.
    *   Run them through your Gemini script.
    *   Verify accuracy (Target >95%).

## 5. Summary Recommendation

*   **Model**: **Google Gemini 1.5 Flash** (via API).
*   **Dataset for Testing**: **LISA Traffic Sign Dataset** (US).
*   **Hardware**: **Standard Cloud CPU** (No GPU needed).
*   **Cost**: extremely low (<$10/mo).

This plan maximizes speed to delivery (24h) while ensuring tailored accuracy for your target market.
