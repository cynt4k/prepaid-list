import numpy as np
import cv2
import pyzbar.pyzbar as pyzbar
import time

cap = cv2.VideoCapture(1)

last_recorded_time = time.time() 
while(True):
    # grab the current time
    curr_time = time.time()

    # Capture frame-by-frame
    ret, frame = cap.read()

    # Our operations on the frame come here
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    if curr_time - last_recorded_time >= 0.5: # it has been at least 1 seconds
        barcodes = pyzbar.decode(frame)

        # loop over the detected barcodes
        for barcode in barcodes:
            # the barcode data is a bytes object so if we want to draw it
            # on our output image we need to convert it to a string first
            barcodeType = barcode.type
            barcodeData = barcode.data.decode("utf-8")
            
            # print the barcode type and data to the terminal
            print("[INFO] Found {} barcode: {}".format(barcodeType, barcodeData))
         # set the last record time to the current time to ensure the delay
        last_recorded_time = curr_time

    # Display the resulting frame
    cv2.imshow('frame',gray)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
       

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()