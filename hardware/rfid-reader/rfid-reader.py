from time import sleep
import sys
from mfrc522 import SimpleMFRC522
import websockets
import asyncio
import json


class RFIDReader():
    def __init__(self):
        print("was da los")
        self.reader = SimpleMFRC522()

    async def readCard(self):
        try:
            while True:
                print("Hold a tag near the reader")
                id, text = self.reader.read()
                print("ID: %s\nText: %s" % (id,text))
                return id, text
        except KeyboardInterrupt:
            GPIO.cleanup()
            raise

async def websocket_rfid(websocket, path):
    print('opened websocket')
    reader = RFIDReader()
    async for message in websocket: 
        cardInput = await reader.readCard()
        print('card id', cardInput)
        message = json.dumps({'cardId': cardInput})
        print('message: ', message)
        result = await websocket.send(message)

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(websockets.serve(websocket_rfid, '10.102.40.40', 8765))
    asyncio.get_event_loop().run_forever()

