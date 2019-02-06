import cv2
import asyncio

class VideoCamera(object):
    def __init__(self, source, show):
        # Using OpenCV to capture from device 0. If you have trouble capturing
        # from a webcam, comment the line below out and use a video file instead.
        self.video = cv2.VideoCapture(source)

        if(show):
            asyncio.new_event_loop()
            asyncio.get_event_loop().run_until_complete(self.show_curr_img())

    def __del__(self):
        self.video.release()
        cv2.destroyAllWindows()

    def get_frame(self):
        success, image = self.video.read()
        # We are using Motion JPEG, but OpenCV defaults to capture raw images,
        # so we must encode it into JPEG in order to correctly display the
        # video stream.
        #ret, jpeg = cv2.imencode('.jpg', image)
        #return jpeg.tobytes()
        return success, image
    
    async def show_curr_img(self):
        # TODO: Delete after tests!
        # show the output frame
        while(self.video.isOpened()):
            succ, frame = self.video.read()
            cv2.imshow("Barcode Scanner", frame)
            # break
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break