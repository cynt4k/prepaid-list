import websockets
import barcode.barcode_reader as barcode
import rfid.rfid_reader as rfid
import asyncio




if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(websockets.serve(barcode.barcode_producer, 'localhost', 8765))
    asyncio.get_event_loop().run_until_complete(websockets.serve(rfid.rfid_producer, 'localhost', 8766))
    asyncio.get_event_loop().run_forever()