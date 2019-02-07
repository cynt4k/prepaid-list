import json

async def read_rfid():
    return 1, "Data"


# asynchronous send of barcode scan
async def rfid_producer(websocket, path):
    # start video capturing
    # cam = VideoCamera('/dev/video0') # pi config
    
    print("[INFO] starting rfid reading ...")
    rfidType, rfidData = await read_rfid()
    await websocket.send(json.dumps({'type': rfidType, 'value': rfidData}))
    
    # do a bit of cleanup
    print("[INFO] stopping and cleaning up of video stream mess ...")