import boto3
import base64
import lzstring

# Create boto3 clients.
s3_client = boto3.client('s3')

# The event is a file, body file name file contents
def lambda_handler(event, context):
    
    
    # This isnt actually in b64 just reusing the var name
    b64_decode = event["fileBody"].decompress()
    
    print(b64_decode)
    
    # b64_decode = base64.b64decode(event["fileBody"])
    

    # Send the body and name of the file to the s3 and get a response
    response = s3_client.put_object(
        Body=b64_decode,
        Key=event["fileName"],
        Bucket="24ours"
    )
    
    # Create a custom url on the fly that expires in 24 hours (the function takes seconds so its 86,400s)
    # The url does not link to the s3 since it is private but makes a temporary link to the s3
    get_url = s3_client.generate_presigned_url('get_object',
                                                    Params = {
                                                        'Bucket': "24ours",
                                                        'Key': event["fileName"]
                                                    },
                                                    ExpiresIn = 86400)
    
    # get = s3_client.get_object(
    #     Bucket="24ours",
    #     Key=event["fileName"],
    #     )
        
    # print(get)
    
    return {
        
        'statusCode': 200,
        'body': {
            "url": get_url
        }
    }
