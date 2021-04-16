import cv2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D
from tensorflow.keras.layers import MaxPooling2D
from tensorflow.keras.layers import Dense, Dropout, Flatten
from tensorflow.keras.optimizers import Adam
import numpy as np

ds_factor=0.6

edEmoModel = Sequential()

# Defining the convolutional layers of the cnn model
edEmoModel.add(Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(48, 48, 1)))
edEmoModel.add(Conv2D(64, kernel_size=(3, 3), activation='relu'))
edEmoModel.add(MaxPooling2D(pool_size=(2, 2)))
edEmoModel.add(Dropout(0.25))

edEmoModel.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
edEmoModel.add(MaxPooling2D(pool_size=(2, 2)))
edEmoModel.add(Conv2D(128, kernel_size=(3, 3), activation='relu'))
edEmoModel.add(MaxPooling2D(pool_size=(2, 2)))
edEmoModel.add(Dropout(0.25))

edEmoModel.add(Flatten())
edEmoModel.add(Dense(1024, activation='relu'))
edEmoModel.add(Dropout(0.5))
edEmoModel.add(Dense(7, activation='softmax'))

face_cascade=cv2.CascadeClassifier("haarcascade_frontalface_alt2.xml")
edEmoModel.load_weights('model.h5')
emotion_dictionary = {0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy", 4: "Neutral", 5: "Sad", 6: "Surprised"}

class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
    
    def __del__(self):
        self.video.release()
    
    def get_frame(self):
        success, image = self.video.read()
        image=cv2.resize(image,None,fx=ds_factor,fy=ds_factor,interpolation=cv2.INTER_AREA)
        gray=cv2.cvtColor(image,cv2.COLOR_BGR2GRAY)
        face_rects=face_cascade.detectMultiScale(gray,1.3,5)
        for (x,y,w,h) in face_rects:
        	#cv2.rectangle(image,(x,y),(x+w,y+h),(0,255,0),2)
            cv2.rectangle(image, (x, y - 50), (x + w, y + h + 10), (255, 0, 0), 2)
            roi_gray = gray[y:y + h, x:x + w]
            cropped_img = np.expand_dims(np.expand_dims(cv2.resize(roi_gray, (48, 48)), -1), 0)
            prediction = edEmoModel.predict(cropped_img)
            maximumIndex = int(np.argmax(prediction))
            cv2.putText(image, emotion_dictionary[maximumIndex], (x + 20, y - 60), cv2.FONT_HERSHEY_SIMPLEX, 1,(255, 255, 255), 2,cv2.LINE_AA)
            break
        ret, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()
