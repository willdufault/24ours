![image](https://github.com/willdufault/24ours/assets/99445180/c4793e1e-13d0-4cf5-965f-6de8d58d0837)

---

[Heroku](https://twentyfourours-718556141502.herokuapp.com/)

## About:

24Ours ia a free file-sharing web application that deletes all files every day at midnight EST. Users can upload files of any type and will recieve a sharable link that will work for exactly 24 hours or until that day at midnight.

## How it works:

![image](https://github.com/willdufault/24ours/assets/99445180/87b1d5eb-91fc-4c53-bdca-968436cad3c5)

The UI for 24Ours was created using React and Bootstrap and is hosted on Heroku. The client sends POST requests using axios to a Node.js server (Express.js), which then makes calls to our Lambda functions through a custom REST API on API Gateway. Our Lambda functions (Python 3) then upload files to an S3 bucket and send back a presigned URL to that file, which can be accessed by anyone with that link. Lastly, at 12 am EST daily, an EventBridge rule calls a Lambda function that wipes all the files in the S3 bucket.  
