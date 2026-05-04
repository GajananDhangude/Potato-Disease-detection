# Potato Disease Detection (AgroVision)
AI-powered potato leaf disease detection with a FastAPI backend and a modern React frontend. Upload a leaf image and the model predicts Early Blight, Late Blight, or Healthy with a confidence score.

## Highlights
- End-to-end flow: upload image, run prediction, show confidence and guidance.
- Modern botanical UI with responsive layout and local scan history.
- FastAPI inference API with CORS configured for local dev.
- Pretrained model included in saved_model/potatoes.h5.

## Architecture
- Frontend (React + Vite): image upload, result visualization, scan history.
- Backend (FastAPI): image preprocessing, TensorFlow model inference.
- Model: CNN trained on the PlantVillage potato dataset.

## Tech Stack
- Frontend: React, Vite, Tailwind, Framer Motion, Lucide icons
- Backend: FastAPI, Uvicorn, TensorFlow, Pillow, NumPy

## Project Structure
```
api/
	main.py
	requirement.txt
frontend/
	src/
	package.json
saved_model/
	potatoes.h5
training/
	training.ipynb
```

## Prerequisites
- Python 3.10+ recommended
- Node.js 18+ recommended

## Backend Setup
1. Create and activate a Python environment.
2. Install dependencies:
	 ```
	 pip install -r api/requirement.txt
	 ```
3. Start the API:
	 ```
	 python -m api.main
	 ```

The API will be available at http://localhost:8080

## Frontend Setup
1. Install dependencies:
	 ```
	 cd frontend
	 npm install
	 ```
2. Start the dev server:
	 ```
	 npm run dev
	 ```

The frontend will be available at http://localhost:5173

## Configuration
Frontend API base URL is configurable with an environment variable.

Create frontend/.env and set:
```
VITE_API_URL=http://localhost:8080
```

## API Reference
- GET /ping
	- Health check. Returns a short string.
- POST /predict
	- Multipart form-data with key: file
	- Response:
		```json
		{
			"class": "Early_Blight",
			"confidence": 0.97
		}
		```

## Model Notes
- Model file: saved_model/potatoes.h5
- Classes: Early_Blight, Late Blight, Healthy
- Input: color leaf image

## Common Issues
- FileNotFoundError for the model path:
	- Use a stable path relative to api/main.py or run from repo root.
- Import errors for fastapi/uvicorn/numpy:
	- Ensure requirements are installed in the active environment.

## Roadmap Ideas
- Add model versioning and structured metadata in API responses.
- Add automated tests for inference and UI state.
- Deploy to a cloud container with GPU inference support.

## License
See LICENSE.
