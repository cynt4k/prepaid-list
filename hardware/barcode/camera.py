import cv2

class VideoCamera(object):
    def __init__(self, source):
        # Using OpenCV to capture from device 0. If you have trouble capturing
        # from a webcam, comment the line below out and use a video file instead.
        self.video = cv2.VideoCapture(source)

    def __del__(self):
        self.video.release()
        cv2.destroyAllWindows()

    def get_frame(self):
        # read the image from the camera
        success, image = self.video.read()

        # convert an modify image before sending it back
        frame = cv2.resize(image, (400, 400))
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
        ret, frm = cv2.threshold(frame, 112, 255, cv2.THRESH_BINARY)
        return success, frm
    

    # method shows the frame with increased image contrast
    def show_contrast(self, frame):
        # CLAHE (Contrast Limited Adaptive Histogram Equalization)
        clahe = cv2.createCLAHE(clipLimit=3., tileGridSize=(8,8))

        lab = cv2.cvtColor(frame, cv2.COLOR_BGR2LAB)  # convert from BGR to LAB color space
        l, a, b = cv2.split(lab)  # split on 3 different channels

        l2 = clahe.apply(l)  # apply CLAHE to the L-channel

        lab = cv2.merge((l2,a,b))  # merge channels
        img2 = cv2.cvtColor(lab, cv2.COLOR_LAB2BGR)  # convert from LAB to BGR
        cv2.imshow('Increased contrast', img2)
        cv2.waitKey(1)


    # method shows the frame with threshold modification
    def show_threshold(self, frame):
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
        ret1,th1 = cv2.threshold(frame, 100, 255, cv2.THRESH_BINARY)
        cv2.imshow('Treshold', th1)
        cv2.waitKey(1)

        # th2 = cv2.adaptiveThreshold(frame,255,cv2.ADAPTIVE_THRESH_MEAN_C,\
        #     cv2.THRESH_BINARY,11,2)
        cv2.imshow('Treshold BINARY', th1)
        cv2.waitKey(1)


    # method shos the frame with gradient modification
    def show_gradient(self, frame):
        cv2.cvtColor(frame, cv2.COLOR_RGB2GRAY)
        # compute the Scharr gradient magnitude representation of the images
        # in both the x and y direction using OpenCV 2.4
        ddepth = cv2.CV_32F
        gradX = cv2.Sobel(frame, ddepth=ddepth, dx=1, dy=0, ksize=-1)
        gradY = cv2.Sobel(frame, ddepth=ddepth, dx=0, dy=1, ksize=-1)
        
        # subtract the y-gradient from the x-gradient
        gradient = cv2.subtract(gradX, gradY)
        gradient = cv2.convertScaleAbs(gradient)
        cv2.imshow('Gradient', gradient)
        cv2.waitKey(1)


    # method shows the "original" frame without any additional modifications
    def show_curr_img(self, frame):
        # TODO: Delete after tests!
        # show the output frame
        cv2.imshow("Original", frame)
        cv2.waitKey(1)