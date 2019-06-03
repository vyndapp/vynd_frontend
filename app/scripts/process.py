def video_to_frames(input_loc, output_loc):
  import time
  import cv2
  import os
  import base64
  from PIL import Image
  from io import BytesIO

  # Set threshold [0.0 --> perfect match, 1.0 mismatch]
  threshold = 0.22
  
  # Log the time
  time_start = time.time()
  
  # Start capturing the feed
  cap = cv2.VideoCapture(input_loc)
  
  # Find the number of frames & fps
  video_length = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
  fps = cap.get(cv2.CAP_PROP_FPS)

  def np_to_b64(frame):
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
  frame = cv2.resize(frame, (448, 448))
  cv2.imwrite(output_loc + "/placeholder.jpg", frame)

  frameTimeInSecs = round(count/fps,2)
  string = np_to_b64(frame)
  stringArr.append('{{ \"frame\":\"{}\", \"time\":\"{}\" }}'.format(string, frameTimeInSecs))
  
  # Initialize Histograms
  hist1 = cv2.calcHist([frame],[0],None,[256],[0,256])
  hist2 = cv2.calcHist([frame],[0],None,[256],[0,256])

  # Start converting the video
  while success:
    # Write the results back to output location
    comp = cv2.compareHist(hist1,hist2,cv2.HISTCMP_BHATTACHARYYA)

    # If the histograms are not similar, save frame
    if comp > threshold:
      frame = cv2.resize(frame, (448, 448))
      
      frameTimeInSecs = round(count/fps,2)
      string = np_to_b64(frame)
      stringArr.append('{{ \"frame\":\"{}\", \"timestamp\":\"{}\" }}'.format(string, frameTimeInSecs))
      hist1 = hist2
      
    success,frame = cap.read()
    count += 1
    hist2 = cv2.calcHist([frame],[0],None,[256],[0,256])

  # Log the time again
  time_end = time.time()

  for string in stringArr:
    print(string)

import sys

video = sys.argv[1]
directory = sys.argv[2]

video_to_frames(video, directory)