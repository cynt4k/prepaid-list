import numpy as np
import cv2
import time
import pyzbar.pyzbar as pyzbar

# initialize the video stream and allow the camera sensor to warm up
print("[INFO] starting video stream...")
cap = cv2.VideoCapture(1)
time.sleep(2.0)
last_recorded_time = time.time() # this keeps track of the last time a frame was processed

def draw_barcode(frame, barcode):
    # extract the bounding box location of the barcode and draw
        # the bounding box surrounding the barcode on the image
        (x, y, w, h) = barcode.rect
        cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 0, 255), 2)

        # draw the barcode data and barcode type on the image
        text = "{} ({})".format(barcode.data.decode("utf-8"), barcode.type)
        cv2.putText(frame, text, (x, y - 10),
            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

import winsound
frequency = 3500  # Set Frequency To 2500 Hertz
duration = 500  # Set Duration To 1000 ms == 1 second

while(True):
    curr_time = time.time() # grab the current time

    # keep these three statements outside of the if statement, so we 
    #     can still display the camera/video feed in real time
    ret, frame = cap.read()

    if curr_time - last_recorded_time >= 2.0: # it has been at least 2 seconds
        barcodes = pyzbar.decode(frame)

        # loop over the detected barcodes
        for barcode in barcodes:
            # the barcode data is a bytes object so if we want to draw it
            # on our output image we need to convert it to a string first
            barcodeType = barcode.type
            barcodeData = barcode.data.decode("utf-8")
            
            # print the barcode type and data to the terminal
            print("[INFO] Found {} barcode: {}".format(barcodeType, barcodeData))

            draw_barcode(frame, barcode)

            #winsound.Beep(frequency, duration)
            print('\a')

        # IMPORTANT CODE BELOW
        last_recorded_time = curr_time

    # show the output frame
    cv2.imshow("Barcode Scanner", frame)
    key = cv2.waitKey(1) & 0xFF

    # if the `q` key was pressed, break from the loop
    if key == ord("q"):
        break

# do a bit of cleanup
print("[INFO] cleaning up...")
cap.release()
cv2.destroyAllWindows()