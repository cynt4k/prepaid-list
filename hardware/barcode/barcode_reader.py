import asyncio
import time
import json
import numpy as np
import pyzbar.pyzbar as pyzbar
import websockets
from camera import VideoCamera

# asynchronous method to read the barcdoe
async def read_barcode(cam:VideoCamera): 
    # this keeps track of the last time a frame was processed
    last_recorded_time = time.time() 

    while(True):
        # grab the current time
        curr_time = time.time()

        if curr_time - last_recorded_time >= 1.0: # it has been at least 1 second

            # get the current frame
            ret, frame = cam.get_frame()

            # decode current frame
            barcodes = pyzbar.decode(frame)

            # loop over the detected barcodes
            for barcode in barcodes:
                # get the type and the data of the barcode
                barcodeType = barcode.type
                barcodeData = barcode.data.decode("utf-8")
                
                # print the barcode type and data to the terminal
                print("[INFO] Found {} barcode: {}".format(barcodeType, barcodeData))
                print('\a') # making a beep ;)

                # return barcode type and barcode data
                return barcodeType, barcodeData

            # set the last record time to the current time to ensure the delay
            last_recorded_time = curr_time
        
            # show current frame TODO: Delete after tests
            #cam.show_curr_img(frame)

# asynchronous send of barcode scan
async def barcode_producer(websocket, path):
    # start video capturing
    # cam = VideoCamera('/dev/video0') # pi config
    cam = VideoCamera(1)
    print("[INFO] starting video stream for barcode scanning ...")
    try:
        while (True):
            bcType, bcData = await read_barcode(cam)
            await websocket.send(json.dumps({'type': bcType, 'value': bcData}))
            
    finally:
        # do a bit of cleanup
        print("[INFO] stopping and cleaning up of video stream mess ...")
        del cam

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(websockets.serve(barcode_producer, 'localhost', 8765))
    asyncio.get_event_loop().run_forever()