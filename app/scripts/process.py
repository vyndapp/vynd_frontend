from pymediainfo import MediaInfo
import time
import cv2
import sys
import os
import base64
from PIL import Image
from io import BytesIO

def get_rotation_angle(input_loc):
  media = MediaInfo.parse(input_loc).to_data()
  for track in media['tracks']:
    if track['track_type'] == 'Video' and 'rotation' in track:
      angle = int(float(track['rotation']))
      return (360 - angle) % 360
  return 0

def video_to_frames(input_loc, output_loc):
  
  # Set threshold [0.0 --> perfect match, 1.0 mismatch]
  threshold = 0.2
  variance = 45
  
  # Log the time
  time_start = time.time()

  rotation_angle = get_rotation_angle(input_loc)
  
  # Start capturing the feed
  cap = cv2.VideoCapture(input_loc)
  
  # Find the number of frames & fps
  video_length = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
  fps = cap.get(cv2.CAP_PROP_FPS)

  def variance_of_laplacian(image):
    return cv2.Laplacian(image, cv2.CV_64F).var()

  def np_to_b64(frame):
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(frame, 'RGB')
    buffer = BytesIO()
    pil_img.save(buffer, 'JPEG')
    image = buffer.getvalue()
    b64 = base64.b64encode(image)
    pil_img.close()
    return b64
  
  stringArr = []

  # Extract the frame
  success, frame = cap.read()
  success = True
  count = 1
  frame = cv2.resize(frame, (500, 500))
  if rotation_angle != 0:
      rows, cols, _ = frame.shape
      M = cv2.getRotationMatrix2D((cols/2,rows/2), rotation_angle, 1)
      frame = cv2.warpAffine(frame, M, (cols,rows))

  cv2.imwrite(output_loc + "/placeholder.jpg", frame)

  # frameTimeInSecs = round(count/fps,2)
  string = np_to_b64(frame)
  # stringArr.append('{{ \"frame\":\"{}\", \"time\":\"{}\" }}'.format(string, frameTimeInSecs))
  stringArr.append(string.decode("utf-8"))

  # Initialize Histograms
  hist1 = cv2.calcHist([frame],[0],None,[256],[0,256])
  hist2 = cv2.calcHist([frame],[0],None,[256],[0,256])

  # Start converting the video
  while success:
    # Write the results back to output location
    comp = cv2.compareHist(hist1,hist2,cv2.HISTCMP_BHATTACHARYYA)
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    fm = variance_of_laplacian(gray)

    # If the histograms are not similar, save frame
    if comp > threshold and fm > variance:

      frame = cv2.resize(frame, (500, 500))

      if rotation_angle != 0:
        rows, cols, _ = frame.shape
        M = cv2.getRotationMatrix2D((cols/2,rows/2), rotation_angle, 1)
        frame = cv2.warpAffine(frame, M, (cols,rows))

      # cv2.imwrite(output_loc + "/%#03d.jpg" % (count), frame, [int(cv2.IMWRITE_JPEG_QUALITY), 75])
      # count += 1
      # frameTimeInSecs = round(count/fps,2)
      string = np_to_b64(frame)
      # stringArr.append('{{ \"frame\":\"{}\", \"timestamp\":\"{}\" }}'.format(string, frameTimeInSecs))
      stringArr.append(string.decode("utf-8"))
      hist1 = hist2
      
    success,frame = cap.read()
    # count += 1
    hist2 = cv2.calcHist([frame],[0],None,[256],[0,256])

  # Log the time again
  time_end = time.time()

  for string in stringArr:
    print(string)

video = sys.argv[1]
directory = sys.argv[2]

video_to_frames(video, directory)