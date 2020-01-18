from time import sleep
import sys
from mfrc522 import SimpleMFRC522
import websockets
import asyncio
import json
import RPi.GPIO as GPIO


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

class WebSocketHandler: 
    def __init__(self):
        self.oldWebsocket = None

    async def websocket_rfid(self, websocket, path):
        if self.oldWebsocket:
            self.oldWebsocket.close()
        self.oldWebsocket = websocket
        print('opened websocket')
        # todo oldwebsocket close
        reader = RFIDReader()
        while True:
            cardInput = await reader.readCard()
            print('card id', cardInput)
            message = json.dumps({'cardId': cardInput})
            print('message: ', message)
            result = await websocket.send(message)
            await asyncio.sleep(3)

if __name__ == "__main__":
    print('Websocket gets served')
    handler = WebSocketHandler()
    asyncio.get_event_loop().run_until_complete(websockets.serve(handler.websocket_rfid, 'localhost', 8765))
    asyncio.get_event_loop().run_forever()

