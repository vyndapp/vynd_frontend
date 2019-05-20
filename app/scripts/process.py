def video_to_frames(input_loc, output_loc):
  import time
  import cv2
  import os
  try:
    os.mkdir(output_loc)
  except OSError:
    pass

  # Set threshold [0.0 --> perfect match, 1.0 mismatch]
  threshold = 0.22
  
  # Log the time
  time_start = time.time()
  
  # Start capturing the feed
  cap = cv2.VideoCapture(input_loc)
  
  # Find the number of frames & fps
  video_length = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
  fps = cap.get(cv2.CAP_PROP_FPS)
  
  print ("Frames: ", video_length)
  print ("FPS: ", round(fps))
  print ("Duration: %d secs" % (round(video_length/fps)))
  
  # Extract the frame
  success, frame = cap.read()
  success = True
  count = 1
  frame = cv2.resize(frame, (448, 448))
  cv2.imwrite(output_loc + "/%#03d.jpg" % (0), frame)
  
  # Initialize Histograms
  hist1 = cv2.calcHist([frame],[0],None,[256],[0,256])
  hist2 = cv2.calcHist([frame],[0],None,[256],[0,256])

  print ("Converting video..\n")
  # Start converting the video
  
  while success:
    # Write the results back to output location
    comp = cv2.compareHist(hist1,hist2,cv2.HISTCMP_BHATTACHARYYA)

    # If the histograms are not similar, save frame
    if comp > threshold:
      frame = cv2.resize(frame, (448, 448))
      cv2.imwrite(output_loc + "/%#03d.jpg" % (count), frame, [int(cv2.IMWRITE_JPEG_QUALITY), 75])
      count += 1
      hist1 = hist2
      
    success,frame = cap.read()
    hist2 = cv2.calcHist([frame],[0],None,[256],[0,256])

  # Log the time again
  time_end = time.time()
  
  # Print stats
  print ("Done extracting frames.\n%d frames extracted" % count)
  print ("It took %d seconds for conversion." % (time_end-time_start))
  

import sys

video = sys.argv[1]
folder = sys.argv[2]

video_to_frames(video, folder)
