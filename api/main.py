from fastapi import FastAPI , File , UploadFile
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()

MODEL = tf.keras.models.load_model("..\saved_model\potatoes.h5")
CLASS_NAMES = ['Early_Blight' , 'Late Blight' , 'Healthy']

@app.get("/ping")
async def ping():
    return "Hello , I an alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))

    return image

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    bytes = await file.read()
    image = read_file_as_image(bytes)

    img_batch = np.expand_dims(image , 0)

    predictions = MODEL.predict(img_batch)

    predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])

    return {
        'class' : predicted_class,
        'confidence' : float(confidence)
    }



if __name__ == "__main__":
    uvicorn.run(app , host='localhost' ,  port=8080)